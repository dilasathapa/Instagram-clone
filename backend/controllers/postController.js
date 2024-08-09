const { body, validationResult } = require('express-validator');
const { Post } = require('../models');

// Validation middleware
const validateCreatePost = [
  body('caption').notEmpty().withMessage('Caption is required'),
  body('image').notEmpty().withMessage('Image is required'),
];

// Create Post controller
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { caption, image, hashtag } = req.body;
  const userId = req.user.id;

  try {
    const newPost = await Post.create({ caption, image, hashtag, userId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createPost, validateCreatePost };
