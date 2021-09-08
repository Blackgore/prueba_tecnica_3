"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserBy = exports.getUsers = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = async (req, res) => {
  try {
    if (!req.body || req.body === {}) {
      res.status(500).json({
        status: 'N',
        msg: 'Bad Request'
      });
    }

    const existUser = await _User.default.findOne({
      username: req.body.username
    });
    console.log('existUser', existUser);

    if (existUser) {
      res.status(400).json({
        status: 'N',
        msg: 'exist user'
      });
    }

    const newUser = new _User.default(req.body);
    const userNew = await newUser.save();
    res.status(200).json({
      status: 'OK',
      msg: userNew
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'E',
      msg: 'error create users'
    });
  }
};

exports.createUser = createUser;

const getUsers = async (req, res) => {
  try {
    if (!req || req === {}) {
      res.status(500).json({
        status: 'N',
        msg: 'Request Error'
      });
    }

    const users = await _User.default.find();

    if (!users || users.length < 0) {
      res.status(400).json({
        status: 'OK',
        msg: 'Users Not Found'
      });
    }

    ;
    res.status(200).json({
      status: 'OK',
      users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'N',
      msg: 'Server ERROR'
    });
  }
};

exports.getUsers = getUsers;

const getUserBy = async (req, res) => {
  try {
    if (!req || !req === {} || !req.params.id || !req.params.id === '') {
      res.status(500).json({
        status: 'N',
        msg: 'Request Error'
      });
    }

    ;
    const _id = req.params.id;
    const userFound = await _User.default.findById(_id);

    if (userFound) {
      res.status(200).json({
        status: 'OK',
        userFound
      });
    } else {
      res.status(404).json({
        status: 'N',
        msg: 'User Not Found'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'OK',
      msg: 'Error server'
    });
  }
};

exports.getUserBy = getUserBy;