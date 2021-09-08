"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const userSchema = new _mongoose.Schema({
  name: String,
  username: String,
  password: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('User', userSchema);

exports.default = _default;