"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbConnection = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await _mongoose.default.connect('mongodb://mongo/PruebaTecnica', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB Online');
    } else {
      await _mongoose.default.connect('mongodb://localhost:27017/PruebaTecnica', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB Online');
    }

    ;
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }
};

var _default = dbConnection;
exports.default = _default;