import {createUser, getUsers, getUserBy} from './users.controller';
import {mockResponse, mockRequest, mockReqCreate, initial} from './mock';
import {connect, close, clear} from '../db.mock';
import User from '../models/User';

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connect();
  await User.insertMany(initial);
});

/**
  * Remove and close the db and server.
  */
afterAll(async () => {
  await clear();
  await close();
});

describe('user Controller', () => {
  describe('user Test SUCCESS', () => {
    let id = '';
    it('api/users - Create user - 200', async () => {
      const req = mockRequest();
      req.body = mockReqCreate;
      const res = mockResponse();
      await createUser(req, res);
      id = res.json.mock.calls[0][0].msg._id.toString();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('api/users - List Users  - 200', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('api/users - List user By Id - 200', async () => {
      const req = mockRequest();
      req.params = {id};
      const res = mockResponse();
      await getUserBy(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('user Test FAIL', () => {
    it('api/users - Create user - Body empty - 500', async () => {
      const req = {};
      const res = mockResponse();
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('api/users - Create user - Request Undefined - 500', async () => {
      const req = undefined;
      const res = mockResponse();
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('api/users - List user By Id - Request emtpy - 500', async () => {
      const req = {};
      const res = mockResponse();
      await getUserBy(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('api/users - List user By Id - id emtpy - 500', async () => {
      const req = {params: {id: ' '}};
      const res = mockResponse();
      await getUserBy(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
