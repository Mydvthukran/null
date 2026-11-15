import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.hoisted(() => {
  process.env.JWT_SECRET = 'test_jwt_secret_key_1234567890';
  process.env.PORT = '5002';
  process.env.FIREBASE_PROJECT_ID = 'college-website-cbebe';
  process.env.ADMIN_EMAILS = 'my3596418@gmail.com';
});

import request from 'supertest';
import jwt from 'jsonwebtoken';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const app = require('../server');
const pool = require('../config/db');
const { deleteFromFTP } = require('../config/ftp');

const mockQuery = vi.spyOn(pool, 'query');

describe('Security Headers & Proxy Config', () => {
  it('should set security headers and hide X-Powered-By header', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(res.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

describe('Permission Enforcement (BFLA Defense)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/applications');
    expect(res.status).toBe(401);
  });

  it('should reject editor without applications permission with 403', async () => {
    const editorToken = jwt.sign(
      {
        id: 2,
        username: 'restricted_editor',
        role: 'editor',
        permissions: ['notices'] // only notices, lacks applications
      },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .get('/api/applications')
      .set('Cookie', [`siet_admin_session=${editorToken}`]);

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/insufficient permissions/i);
  });

  it('should allow super_admin to access protected endpoints', async () => {
    mockQuery.mockResolvedValueOnce([[{ id: 1, name: 'John Doe', course: 'B.Tech' }]]);

    const superAdminToken = jwt.sign(
      {
        id: 1,
        username: 'my3596418@gmail.com',
        role: 'super_admin',
        permissions: []
      },
      process.env.JWT_SECRET
    );

    const res = await request(app)
      .get('/api/applications')
      .set('Cookie', [`siet_admin_session=${superAdminToken}`]);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('applications');
  });
});

describe('FTP Path Traversal Protection', () => {
  it('should block path traversal sequences in deleteFromFTP', async () => {
    process.env.FTP_BASE_URL = 'https://storage.example.com';
    process.env.FTP_BASE_DIR = '/public_html/uploads';

    const traversalUrl = 'https://storage.example.com/../../etc/passwd';
    const result = await deleteFromFTP(traversalUrl);
    expect(result).toBe(false);
  });
});
