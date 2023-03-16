const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.NEXT_DB_HOST,
  username: process.env.NEXT_DB_USERNAME,
  password: process.env.NEXT_DB_PASSWORD,
  database: process.env.NEXT_DB_NAME,
  dialectOptions: {
    ssl: true,
  },
};

/**
 * import { DataTypes } from 'sequelize'
import sequelize from '../lib/sequelize'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default User
 */
