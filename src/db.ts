import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('petdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});
