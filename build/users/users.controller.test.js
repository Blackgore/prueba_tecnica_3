"use strict";

var _users = require("./users.controller");

var _mock = require("./mock");

var _db = require("../db.mock");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await (0, _db.connect)();
  await _User.default.insertMany(_mock.initial);
});
/**
  * Remove and close the db and server.
  */

afterAll(async () => {
  await (0, _db.clear)();
  await (0, _db.close)();
});
describe('user Controller', () => {
  describe('user Test SUCCESS', () => {
    let id = '';
    it('api/users - Create user - 200', async () => {
      const req = (0, _mock.mockRequest)();
      req.body = _mock.mockReqCreate;
      const res = (0, _mock.mockResponse)();
      await (0, _users.createUser)(req, res);
      id = res.json.mock.calls[0][0].msg._id.toString();
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('api/users - List Users  - 200', async () => {
      const req = (0, _mock.mockRequest)();
      const res = (0, _mock.mockResponse)();
      await (0, _users.getUsers)(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it('api/users - List user By Id - 200', async () => {
      const req = (0, _mock.mockRequest)();
      req.params = {
        id
      };
      const res = (0, _mock.mockResponse)();
      await (0, _users.getUserBy)(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe('user Test FAIL', () => {
    it('api/users - Create user - Body empty - 500', async () => {
      const req = {};
      const res = (0, _mock.mockResponse)();
      await (0, _users.createUser)(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it('api/users - Create user - Request Undefined - 500', async () => {
      const req = undefined;
      const res = (0, _mock.mockResponse)();
      await (0, _users.createUser)(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it('api/users - List user By Id - Request emtpy - 500', async () => {
      const req = {};
      const res = (0, _mock.mockResponse)();
      await (0, _users.getUserBy)(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it('api/users - List user By Id - id emtpy - 500', async () => {
      const req = {
        params: {
          id: ' '
        }
      };
      const res = (0, _mock.mockResponse)();
      await (0, _users.getUserBy)(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});