"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

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
describe('Routes Test', () => {
  describe('Test - user - SUCCESS', () => {
    let id = '';
    it('Test - api/users - POST - 200', async () => {
      const response = await (0, _supertest.default)(_app.default).post('/users').send(_mock.mockReqCreate).set('Accept', 'application/json').expect(200);
      expect(response.status).toBe(200);
      id = response.body.msg._id.toString();
      console.log('response id', id);
    });
    it('Test - api/user - GET - 200', async () => {
      const response = await (0, _supertest.default)(_app.default).get(`/users`).set('Accept', 'application/json').expect(200);
      expect(response.status).toBe(200);
    });
    it('Test - api/users - GET By Id - 200', async () => {
      const response = await (0, _supertest.default)(_app.default).get(`/users/${id}`).set('Accept', 'application/json').expect(200);
      expect(response.status).toBe(200);
    });
  });
  describe('Test - user - FAIL', () => {
    it('Test - api/users - POST - 400', async () => {
      const response = await (0, _supertest.default)(_app.default).post('/users').send({}).set('Accept', 'application/json').expect(400);
      expect(response.status).toBe(400);
    });
    it('Test - api/users - GET By Id - request is emtpy - 500', async () => {
      const response = await (0, _supertest.default)(_app.default).get(`/users/${undefined}`).set('Accept', 'application/json').expect(500);
      expect(response.status).toBe(500);
    });
    it('Test - api/users - GET By Id - user not found - 400', async () => {
      const response = await (0, _supertest.default)(_app.default).get(`/users/${'1111'}`).set('Accept', 'application/json').expect(500);
      expect(response.status).toBe(500);
    });
  });
});