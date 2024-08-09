const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');

// Define associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'postedBy' });

module.exports = { sequelize, User, Post };
