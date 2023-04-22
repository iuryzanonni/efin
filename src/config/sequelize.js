const { Sequelize } = require("sequelize");
require("dotenv").config();
require("pg");

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
