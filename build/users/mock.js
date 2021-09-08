"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockReqCreate = exports.mockReqUpdate = exports.mockResponse = exports.initial = exports.mockRequest = void 0;

const mockRequest = () => {
  const req = {};
  return req;
};

exports.mockRequest = mockRequest;
const initial = [{
  name: 'Daniel Perez Jose Urbaez',
  username: 'Djpu1994',
  password: '123456'
}, {
  name: 'jonathan',
  username: 'Djpu1995',
  password: '123456'
}, {
  name: 'Adrian',
  username: 'Djpu1996',
  password: '123456'
}, {
  name: 'Felix',
  username: 'Djpu1997',
  password: '123456'
}];
exports.initial = initial;

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

exports.mockResponse = mockResponse;
const mockReqUpdate = {
  name: 'Daniel Perez',
  password: '44444444',
  username: 'djpu1994'
};
exports.mockReqUpdate = mockReqUpdate;
const mockReqCreate = {
  name: 'Daniel Perez Jose Urbaez',
  password: '44444444',
  username: 'djpu1994'
};
exports.mockReqCreate = mockReqCreate;