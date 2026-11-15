import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.hoisted(() => {
  process.env.JWT_SECRET = 'test_jwt_secret_key_1234567890';
  process.env.PORT = '5003';
  process.env.FIREBASE_PROJECT_ID = 'college-website-cbebe';
  process.env.ADMIN_EMAILS = 'my3596418@gmail.com';
});

import request from 'supertest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../server');
const firebaseAuth = require('../utils/firebaseAuth');

describe('Firebase Auth Route & Verification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /api/auth/firebase-login', () => {
    it('should return 400 when idToken is missing', async () => {
      const res = await request(app)
        .post('/api/auth/firebase-login')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Firebase ID token is required.');
    });

    it('should return 401 when idToken verification fails', async () => {
      vi.spyOn(firebaseAuth, 'verifyFirebaseIdToken').mockRejectedValueOnce(new Error('Invalid token signature'));

      const res = await request(app)
        .post('/api/auth/firebase-login')
        .send({ idToken: 'invalid-token' });

      expect(res.status).toBe(401);
      expect(res.body.error).toContain('Authentication failed');
    });

    it('should return 403 when Google account email is not in the authorized list', async () => {
      vi.spyOn(firebaseAuth, 'verifyFirebaseIdToken').mockResolvedValueOnce({
        uid: 'unauthorized-uid-9999',
        email: 'unauthorized-user@gmail.com',
        name: 'Random User',
        picture: 'https://example.com/avatar.jpg'
      });

      const res = await request(app)
        .post('/api/auth/firebase-login')
        .send({ idToken: 'valid-token-unauthorized-email' });

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Access Denied');
      expect(res.body.error).toContain('unauthorized-user@gmail.com');
    });

    it('should succeed and set session cookie when Firebase token email is my3596418@gmail.com', async () => {
      vi.spyOn(firebaseAuth, 'verifyFirebaseIdToken').mockResolvedValueOnce({
        uid: 'admin-uid-12345',
        email: 'my3596418@gmail.com',
        name: 'Manish Yadav',
        picture: 'https://example.com/avatar.jpg'
      });

      const res = await request(app)
        .post('/api/auth/firebase-login')
        .send({ idToken: 'valid-mock-firebase-token' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Login successful via Firebase Authentication');
      expect(res.body.admin).toHaveProperty('email', 'my3596418@gmail.com');
      expect(res.body.admin).toHaveProperty('role', 'super_admin');
      expect(res.headers['set-cookie']).toBeDefined();
    });
  });
});
