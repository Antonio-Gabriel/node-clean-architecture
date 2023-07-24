import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'computer',
      price: 5000,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('computer');
    expect(response.body.price).toBe(5000);
  });

  it('should list all product', async () => {
    const response = await request(app).post('/product').send({
      name: 'computer',
      price: 5000,
    });

    expect(response.status).toBe(200);

    const response2 = await request(app).post('/product').send({
      name: 'keyboard',
      price: 200,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/product').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe('computer');
    expect(product.price).toBe(5000);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe('keyboard');
    expect(product2.price).toBe(200);
  });
});
