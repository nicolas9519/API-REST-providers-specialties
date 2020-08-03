import { expect } from 'chai';
import * as faker from 'faker';
import { agent as request } from 'supertest';
import app from '../../src/app';

describe('Specialty', () => {

  it('should POST /specialty', async () => {
    const specialty = {
      name: faker.name.jobTitle(),
      createdBy: faker.random.number()
    };
    const res = await request(app).post('/specialty').send(specialty);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an('object');
  });

  it('should GET /specialty', async () => {
    const res = await request(app).get('/specialty');
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an('array');
  });

});
