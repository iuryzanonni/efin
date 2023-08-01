const { Sequelize } = require("sequelize");
require("pg");
require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.NEXT_PUBLIC_DB_HOST,
  username: process.env.NEXT_PUBLIC_DB_USERNAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  dialectOptions: {
    ssl: true,
  },
};
