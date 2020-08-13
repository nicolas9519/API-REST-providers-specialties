import { expect } from 'chai';
import * as faker from 'faker';
import { ObjectID } from 'mongodb';
import { agent as request } from 'supertest';
import app from '../../src/app';
import { ISpecialty } from '../../src/components/specialty/interfaces/ISpecialty';

describe('Specialty', () => {

  const route = '/specialty';
  let specialty: ISpecialty;
  const newSpecialty = {
    name: faker.name.jobArea(),
    createdBy: faker.random.number()
  };

  describe(`POST ${route}`, () => {

    it(`should create a new specialty`, async () => {
      const res = await request(app).post(route).send(newSpecialty);
      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data).to.be.an('object');
      specialty = res.body.data;
    });

    it(`should show an error of missing data`, async () => {
      const specialty = { ...newSpecialty, name: null };
      const res = await request(app).post(route).send(specialty);
      expect(res.status).to.equal(400);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

    it(`should show an error of specialty already exists`, async () => {
      const res = await request(app).post(route).send(newSpecialty);
      expect(res.status).to.equal(409);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

  });

  describe(`GET ${route}`, () => {

    it(`should get all the specialties`, async () => {
      const res = await request(app).get(route);
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data).to.be.an('array');
    });

    it(`should get specific specialty ${route}/:id`, async () => {
      const res = await request(app).get(`${route}/${specialty._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data).to.be.an('object');
    });

    it(`should not found the specialty ${route}/:id`, async () => {
      const fake_id = new ObjectID();
      const res = await request(app).get(`${route}/${fake_id}`);
      expect(res.status).to.equal(404);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

  });

  describe(`PUT ${route}`, () => {
    const updatedSpecialty = {
      name: faker.name.jobArea(),
      updatedBy: faker.random.number()
    };
    const fake_id = new ObjectID();

    it(`should update a specialty`, async () => {
      const res = await request(app).put(`${route}/${specialty._id}`).send(updatedSpecialty);
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.name).to.be.equal(updatedSpecialty.name);
      expect(res.body.data.updatedBy).to.be.equal(updatedSpecialty.updatedBy);
    });

    it(`should get conflict with the name`, async () => {
      const res = await request(app).put(`${route}/${fake_id}`).send(updatedSpecialty);
      expect(res.status).to.equal(409);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

    it(`should not found the specialty to update`, async () => {
      const updatedSpecialty = {
        name: faker.name.jobArea(),
        updatedBy: faker.random.number()
      };
      const res = await request(app).put(`${route}/${fake_id}`).send(updatedSpecialty);
      expect(res.status).to.equal(404);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

    it(`should show an error of missing data`, async () => {
      const res = await request(app).put(`${route}/${specialty._id}`).send({ ...updatedSpecialty, updatedBy: null });
      expect(res.status).to.equal(400);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });
  });

  describe(`DELETE ${route}/:id`, () => {

    it(`should delete the specialty`, async () => {
      const res = await request(app).delete(`${route}/${specialty._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.data).not.to.be.empty;
      expect(res.body.data).to.be.an('object');
    });

    it(`should not found the specialty`, async () => {
      const res = await request(app).delete(`${route}/${specialty._id}`);
      expect(res.status).to.equal(404);
      expect(res.body).not.to.be.empty;
      expect(res.body.message).to.be.an('string');
    });

  });

});
