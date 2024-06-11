// routes/postRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const postController = require("../controllers/postController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

router.post('/createpost', upload.single('image'),postController.createPost) ;

router.get('/getpost', postController.getOrgPost);

router.get('/getposts', postController.getAllPosts);

router.delete('/deletepost/:id', postController.deletePost);

router.put('/donateMoney', postController.donateMoney);

module.exports = router;
