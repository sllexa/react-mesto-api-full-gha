const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
