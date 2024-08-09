const express = require('express');
const router = express.Router();
const {
  createPost,
  validateCreatePost,
} = require('../controllers/postController');
const authorizeUser = require('../middlewares/authorizeUser');

router.post('/create', authorizeUser, validateCreatePost, createPost);

module.exports = router;
