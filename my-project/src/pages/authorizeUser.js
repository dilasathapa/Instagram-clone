const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const authorizeUser = async (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization || !Authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, message: 'Authentication required' });
  }
  const token = auhtorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = User.findByPk(payload.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
    req.user = user;
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .json({ success: false, message: 'Invalid credentials' });
  }
};

module.exports = authorizeUser;
