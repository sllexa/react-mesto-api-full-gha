const errMongo = require('mongoose').Error;
const Card = require('../models/card');
const { CREATE_CODE_SUCCESS } = require('../utils/constants');

const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });
    res.status(CREATE_CODE_SUCCESS).send(card);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные для создания карточки'));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным id не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалять чужие карточки');
    }
    await Card.deleteOne(card);
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err instanceof errMongo.CastError) {
      next(new BadRequestError('Передан некорректный id карточки'));
    } else {
      next(err);
    }
  }
};

const handeleLikeCard = async (req, res, next, options) => {
  try {
    const action = options.add ? '$addToSet' : '$pull';
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { [action]: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий id карточки');
    }
    res.send(card);
  } catch (err) {
    if (err instanceof errMongo.CastError) {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  handeleLikeCard(req, res, next, { add: true });
};

const dislikeCard = async (req, res, next) => {
  handeleLikeCard(req, res, next, { add: false });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
