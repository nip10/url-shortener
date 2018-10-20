import app from '../app';
import request, { Response } from 'supertest';

describe('Middleware', () => {
  it('should return 404 if the route is not defined', done => {
    const invalidRoute = '/foo/bar';
    return request(app)
      .get(invalidRoute)
      .expect(404)
      .expect((res: Response) => {
        expect(res.body.error).toBeDefined();
      })
      .end(done)
  })
});