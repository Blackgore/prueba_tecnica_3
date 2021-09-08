import request from 'supertest';
import app from '../app';
import {mockReqCreate, initial} from './mock';
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

describe('Routes Test', () => {
  describe('Test - user - SUCCESS', () => {
    let id = '';
    it('Test - api/users - POST - 200', async () => {
      const response = await request(app)
          .post('/users')
          .send(mockReqCreate)
          .set('Accept', 'application/json')
          .expect(200);
      expect(response.status).toBe(200);
      id = response.body.msg._id.toString();
      console.log('response id', id);
    });

    it('Test - api/user - GET - 200', async () => {
      const response = await request(app)
          .get(`/users`)
          .set('Accept', 'application/json')
          .expect(200);
      expect(response.status).toBe(200);
    });

    it('Test - api/users - GET By Id - 200', async () => {
      const response = await request(app)
          .get(`/users/${id}`)
          .set('Accept', 'application/json')
          .expect(200);
      expect(response.status).toBe(200);
    });
  });

  describe('Test - user - FAIL', () => {
    it('Test - api/users - POST - 400', async () => {
      const response = await request(app)
          .post('/users')
          .send({})
          .set('Accept', 'application/json')
          .expect(400);
      expect(response.status).toBe(400);
    });

    it('Test - api/users - GET By Id - request is emtpy - 500', async () => {
      const response = await request(app)
          .get(`/users/${undefined}`)
          .set('Accept', 'application/json')
          .expect(500);
      expect(response.status).toBe(500);
    });

    it('Test - api/users - GET By Id - user not found - 400', async () => {
      const response = await request(app)
          .get(`/users/${'1111'}`)
          .set('Accept', 'application/json')
          .expect(500);
      expect(response.status).toBe(500);
    });
  });
});
