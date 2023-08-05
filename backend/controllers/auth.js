const bcrypt = require('bcrypt');
const errMongo = require('mongoose').Error;
const User = require('../models/user');
const { CREATE_CODE_SUCCESS } = require('../utils/constants');
const { generateToken } = require('../utils/token');

const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Поля email и password обязательны.');
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(CREATE_CODE_SUCCESS).send({
      user: {
        name, about, avatar, email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
    } else if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const payload = { _id: user._id };
    const token = generateToken(payload);
    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send(payload);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const logOut = async (req, res, next) => {
  try {
    await res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Пока-пока!' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, login, logOut };
