import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/sequelize/model/customer.model';
import ProductModel from '../product/sequelize/model/product.model';

import { router } from './routes';

export const app: Express = express();

app.use(express.json());
app.use(router);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync()
}

setupDb();
