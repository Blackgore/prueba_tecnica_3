"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = exports.close = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodbMemoryServer = require("mongodb-memory-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mongoServer; // For mongodb-memory-server's old version (< 7) use this instead:
// const mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}; // Provide connection to a new in-memory database server.

const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await _mongoose.default.disconnect();
  mongoServer = await _mongodbMemoryServer.MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await _mongoose.default.connect(mongoUri, opts, err => {
    if (err) {
      console.error(err);
    }
  });
}; // Remove and close the database and server.


exports.connect = connect;

const close = async () => {
  await _mongoose.default.disconnect();
  await mongoServer.stop();
}; // Remove all data from collections


exports.close = close;

const clear = async () => {
  const collections = _mongoose.default.connection.collections; // eslint-disable-next-line guard-for-in

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

exports.clear = clear;