import request from 'supertest';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pool = require('../config/db');
import app from '../server';

// The application uses CommonJS `require`, so mocking the ESM package import
// does not intercept its database pool. Spy on the actual pool instead to
// keep this suite isolated from the configured database.
const mockQuery = vi.spyOn(pool, 'query');
const mockExecute = vi.spyOn(pool, 'execute');

// Mock FTP
vi.mock('../config/ftp', () => ({
  uploadToFTP: vi.fn().mockResolvedValue('https://mocked-path/file.jpg'),
  deleteFromFTP: vi.fn().mockResolvedValue(true)
}));

// Set dummy JWT secret for testing
process.env.JWT_SECRET = 'test-secret';
process.env.PORT = '5001'; // Avoid conflict with dev server if running

describe('Notices API Routes', () => {
  const adminToken = jwt.sign({ id: 1, role: 'super_admin' }, process.env.JWT_SECRET);
  const authHeader = `Bearer ${adminToken}`;

  beforeEach(() => {
    mockQuery.mockReset();
    mockExecute.mockReset().mockResolvedValue([{}]);
    vi.clearAllMocks();
  });

  describe('GET /api/notices', () => {
    it('should return published notices', async () => {
      const mockNotices = [{ id: 1, title: 'Public Notice' }];
      mockQuery.mockResolvedValue([mockNotices]);

      const res = await request(app).get('/api/notices');
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockNotices);
      expect(mockQuery).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      mockQuery.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/notices');
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Server error fetching notices');
    });
  });

  describe('GET /api/notices/admin', () => {
    it('should return all notices for admin', async () => {
      const mockNotices = [{ id: 1, title: 'Admin Notice' }];
      pool.query.mockResolvedValue([mockNotices]);

      const res = await request(app)
        .get('/api/notices/admin')
        .set('Authorization', authHeader);
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockNotices);
    });

    it('should return 401 if unauthorized', async () => {
      const res = await request(app).get('/api/notices/admin');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/notices', () => {
    it('should create a new notice', async () => {
      mockQuery.mockResolvedValue([{ insertId: 10 }]);

      const res = await request(app)
        .post('/api/notices')
        .set('Authorization', authHeader)
        .send({ title: 'New Notice', category: 'Notice', status: 'Active' });
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id', 10);
    });
  });

  describe('DELETE /api/notices/:id', () => {
    it('should delete a notice and return success', async () => {
      mockQuery.mockResolvedValueOnce([[{ file_path: null }]]); // SELECT
      mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }]); // DELETE

      const res = await request(app)
        .delete('/api/notices/1')
        .set('Authorization', authHeader);
      
      expect(res.status).toBe(200);
    });
  });
});
