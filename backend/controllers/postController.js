
const db = require('../Models/Model');
const errorHandler = require('../utils/errorHandler');


  

const createPost = async (req, res) => {
    const { id, title, description, date, targetMoney, amountCollected } = req.body;
    const picture = req.file ? req.file.filename : '';
    const values = [id, title, picture, description, date, targetMoney, amountCollected];
  
    db.createPost(values, (err, resdata) => {
      if (err) return errorHandler(res, err, 'Post not created');
      res.status(200).send(resdata);
    });
};

const getOrgPost = async (req, res) => {
    const { orgid } = req.query;

    db.getPost(orgid, (err, resdata) => {
      if (err) return errorHandler(res, err, 'Post not retrieved');
      res.status(200).json(resdata);
    });
};

const getAllPosts = async (req, res) => {
    db.allPosts((err, resdata) => {
        if (err) return errorHandler(res, err, 'Posts not retrieved');
        res.status(200).json(resdata);
      });
};

const deletePost = async (req, res) => {
    const { id: postId } = req.params;

  db.deletePost(postId, (err) => {
    if (err) return errorHandler(res, err, 'Post not deleted');
    res.status(200).json({ message: 'Post deleted successfully' });
  });
};

const donateMoney = async (req, res) => {
    const { id, money } = req.body;
    const data = { id, money };
  
    db.donate(data, (err) => {
      if (err) return errorHandler(res, err, 'Failed to update donation');
      res.status(200).json({ message: 'Donation updated successfully' });
    });
};

const email = async (req, res) => {
   
};


module.exports = { createPost,getOrgPost,getAllPosts,deletePost,donateMoney};