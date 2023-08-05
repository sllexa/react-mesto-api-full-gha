const AuthorizedError = require('../utils/errors/AuthorizedError');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  if (!token) {
    throw new AuthorizedError('Необходима авторизация.');
  }

  try {
    payload = checkToken(token);
    req.user = payload;
  } catch (err) {
    next(new AuthorizedError('Необходима авторизация.'));
  }
  next();
};
