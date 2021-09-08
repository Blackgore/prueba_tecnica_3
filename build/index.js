"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./app"));

var _db = _interopRequireDefault(require("./db"));

var _db2 = require("./db.mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

if (process.env.NODE_ENV === 'test') {
  (0, _db2.connection)();
} else {
  (0, _db.default)();
}

_app.default.listen(3000);

console.log('http://localhost:3000');
var _default = _app.default;
exports.default = _default;