const db = require('../Models/Model');
const { organizationRegistration, ID } = require('../controllers/organization');
const errorHandler = require('../utils/errorHandler');

jest.mock('../Models/Model');
jest.mock('../utils/errorHandler');

describe('Organization Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('organizationRegistration', () => {
    it('should register an organization successfully', async () => {
      db.register.mockImplementation((data, callback) => callback(null, { success: 'Organization registered' }));

      const req = {
        body: {
          id: '1',
          organizationName: 'Test Organization',
          directorName: 'Test Director',
          email: 'test@example.com',
          phone: '1234567890',
          address: '123 Test St',
          mission: 'Test Mission',
          description: 'Test Description',
          website: 'http://test.com'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await organizationRegistration(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'Organization registered' });
    });

    it('should return error if organization registration fails', async () => {
      db.register.mockImplementation((data, callback) => callback(new Error('Registration failed')));

      const req = {
        body: {
          id: '1',
          organizationName: 'Test Organization',
          directorName: 'Test Director',
          email: 'test@example.com',
          phone: '1234567890',
          address: '123 Test St',
          mission: 'Test Mission',
          description: 'Test Description',
          website: 'http://test.com'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await organizationRegistration(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Registration failed'), 'Organization not registered');
    });
  });

  describe('ID', () => {
    it('should retrieve an ID successfully', async () => {
      db.getId.mockImplementation((id, callback) => callback(null, { id: '1' }));

      const req = {
        body: {
          userid: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await ID(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return error if ID retrieval fails', async () => {
      db.getId.mockImplementation((id, callback) => callback(new Error('ID retrieval failed')));

      const req = {
        body: {
          userid: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ID(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('ID retrieval failed'), 'ID not retrieved');
    });
  });
});
