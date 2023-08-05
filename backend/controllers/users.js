const errMongo = require('mongoose').Error;
const User = require('../models/user');

const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err instanceof errMongo.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
    } else {
      next(err);
    }
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getMe,
};
