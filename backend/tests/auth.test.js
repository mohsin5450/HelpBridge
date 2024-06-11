const db = require('../Models/Model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { signUp, login, email } = require('../controllers/auth');
const { emailConfig } = require('../config/config');
jest.mock('bcrypt');
jest.mock('../Models/Model');
jest.mock('nodemailer');
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should sign up a user successfully', async () => {
      db.getEmails.mockImplementation((email, callback) => callback(null, []));
      bcrypt.genSaltSync.mockReturnValue('salt');
      bcrypt.hashSync.mockReturnValue('hashedPassword');
      db.signup.mockImplementation((userdata, callback) => callback(null, { success: 'User signed up' }));

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          fullname: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: 'User signed up' });
    });

    it('should return error if email already exists', async () => {
      db.getEmails.mockImplementation((email, callback) => callback(null, [{ email: 'test@example.com' }]));

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          fullname: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email Already Exists' });
    });

    it('should return error if sign up fails', async () => {
      db.getEmails.mockImplementation((email, callback) => callback(null, []));
      bcrypt.genSaltSync.mockReturnValue('salt');
      bcrypt.hashSync.mockReturnValue('hashedPassword');
      db.signup.mockImplementation((userdata, callback) => callback(new Error('Signup failed')));

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          fullname: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not signed up' });
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      db.login.mockImplementation((email, callback) => callback(null, [{ email: 'test@example.com', password: 'hashedPassword' }]));
      bcrypt.compareSync.mockReturnValue(true);

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.send).toHaveBeenCalledWith([{ email: 'test@example.com', password: 'hashedPassword' }]);
    });

    it('should return error if email or password is incorrect', async () => {
      db.login.mockImplementation((email, callback) => callback(null, [{ email: 'test@example.com', password: 'hashedPassword' }]));
      bcrypt.compareSync.mockReturnValue(false);

      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email or password incorrect' });
    });
  });

  describe('email', () => {
    it('should send an email successfully', async () => {
      const sendMailMock = jest.fn((mailData, callback) => callback(null, { response: '250 OK' }));
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

      const req = {
        body: {
          email: 'test@example.com',
          otp: '123456'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await email(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email sent successfully', info: { response: '250 OK' } });
    });

    it('should return error if email sending fails', async () => {
      const sendMailMock = jest.fn((mailData, callback) => callback(new Error('Failed to send email')));
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

      const req = {
        body: {
          email: 'test@example.com',
          otp: '123456'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await email(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to send email' });
    });
  });
});
