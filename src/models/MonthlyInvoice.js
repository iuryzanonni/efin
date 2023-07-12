const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User");
const config = require("../config/sequelize");
const sequelize = new Sequelize(config);

const MonthlyInvoice = sequelize.define(
  "MonthlyInvoice",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    dueDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    tableName: "MonthlyInvoice",
  }
);

MonthlyInvoice.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = MonthlyInvoice;
