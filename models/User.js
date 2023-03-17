const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/sequelize");
const sequelize = new Sequelize(config);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roles: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "User",
  }
);

export default User;
