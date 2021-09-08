"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _users = _interopRequireDefault(require("./users/users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.set('pkg', _package.default);
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/users', _users.default);
var _default = app;
exports.default = _default;