const db = require('../Models/Model');
const { createPost, getOrgPost, getAllPosts, deletePost, donateMoney } = require('../controllers/post');
const errorHandler = require('../utils/errorHandler');

jest.mock('../Models/Model');
jest.mock('../utils/errorHandler');

describe('Post Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a post successfully', async () => {
      db.createPost.mockImplementation((values, callback) => callback(null, { success: 'Post created' }));

      const req = {
        body: {
          id: '1',
          title: 'Test Post',
          description: 'Test Description',
          date: '2021-01-01',
          targetMoney: 1000,
          amountCollected: 100
        },
        file: {
          filename: 'test.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ success: 'Post created' });
    });

    it('should return error if post creation fails', async () => {
      db.createPost.mockImplementation((values, callback) => callback(new Error('Creation failed')));

      const req = {
        body: {
          id: '1',
          title: 'Test Post',
          description: 'Test Description',
          date: '2021-01-01',
          targetMoney: 1000,
          amountCollected: 100
        },
        file: {
          filename: 'test.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createPost(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Creation failed'), 'Post not created');
    });
  });

  describe('getOrgPost', () => {
    it('should retrieve an organization post successfully', async () => {
      db.getPost.mockImplementation((orgid, callback) => callback(null, { id: '1', title: 'Test Post' }));

      const req = {
        query: {
          orgid: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getOrgPost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: '1', title: 'Test Post' });
    });

    it('should return error if organization post retrieval fails', async () => {
      db.getPost.mockImplementation((orgid, callback) => callback(new Error('Retrieval failed')));

      const req = {
        query: {
          orgid: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getOrgPost(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Retrieval failed'), 'Post not retrieved');
    });
  });

  describe('getAllPosts', () => {
    it('should retrieve all posts successfully', async () => {
      db.allPosts.mockImplementation((callback) => callback(null, [{ id: '1', title: 'Test Post' }]));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: '1', title: 'Test Post' }]);
    });

    it('should return error if all posts retrieval fails', async () => {
      db.allPosts.mockImplementation((callback) => callback(new Error('Retrieval failed')));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllPosts(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Retrieval failed'), 'Posts not retrieved');
    });
  });

  describe('deletePost', () => {
    it('should delete a post successfully', async () => {
      db.deletePost.mockImplementation((postId, callback) => callback(null));

      const req = {
        params: {
          id: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
    });

    it('should return error if post deletion fails', async () => {
      db.deletePost.mockImplementation((postId, callback) => callback(new Error('Deletion failed')));

      const req = {
        params: {
          id: '1'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deletePost(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Deletion failed'), 'Post not deleted');
    });
  });

  describe('donateMoney', () => {
    it('should update donation successfully', async () => {
      db.donate.mockImplementation((data, callback) => callback(null));

      const req = {
        body: {
          id: '1',
          money: 100
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await donateMoney(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Donation updated successfully' });
    });

    it('should return error if donation update fails', async () => {
      db.donate.mockImplementation((data, callback) => callback(new Error('Update failed')));

      const req = {
        body: {
          id: '1',
          money: 100
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await donateMoney(req, res);

      expect(errorHandler).toHaveBeenCalledWith(res, new Error('Update failed'), 'Failed to update donation');
    });
  });
});
