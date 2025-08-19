import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

const Pet = sequelize.define('Pet', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.STRING, allowNull: false },
  nextWalk: { type: DataTypes.DATE },
  nextVet: { type: DataTypes.DATE },
  photo: { type: DataTypes.STRING }
});

export default Pet;
