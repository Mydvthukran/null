import request from 'supertest';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

import pool from '../config/db';
import app from '../server';

let originalQuery;

// Mock Cloudinary
vi.mock('multer-storage-cloudinary', () => ({
  CloudinaryStorage: vi.fn().mockImplementation(() => ({
    _handleFile: (req, file, cb) => cb(null, { path: 'mocked-path', size: 100 }),
    _removeFile: (req, file, cb) => cb(null)
  }))
}));

// Set dummy JWT secret for testing
process.env.JWT_SECRET = 'test-secret';
process.env.PORT = '5001'; // Avoid conflict with dev server if running

import app from '../server';

describe('Notices API Routes', () => {
  const adminToken = jwt.sign({ id: 1, role: 'super_admin' }, process.env.JWT_SECRET);
  const authHeader = `Bearer ${adminToken}`;

  beforeEach(() => {
    originalQuery = pool.query;
    pool.query = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    pool.query = originalQuery;
  });

  describe('GET /api/notices', () => {
    it('should return published notices', async () => {
      const mockNotices = [{ id: 1, title: 'Public Notice' }];
      pool.query.mockResolvedValue([mockNotices]);

      const res = await request(app).get('/api/notices');
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockNotices);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      pool.query.mockRejectedValue(new Error('DB Error'));

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
      pool.query.mockResolvedValue([{ insertId: 10 }]);

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
      pool.query.mockResolvedValueOnce([[{ file_path: null }]]); // SELECT
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // DELETE

      const res = await request(app)
        .delete('/api/notices/1')
        .set('Authorization', authHeader);
      
      expect(res.status).toBe(200);
    });
  });
});
