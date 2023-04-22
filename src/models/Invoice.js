const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config/sequelize");
const sequelize = new Sequelize(config);

const User = require("./User");

const Invoice = sequelize.define(
  "Invoice",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    installments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment: {
      type: DataTypes.DATE,
    },
    isMonthly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Invoice",
  }
);

Invoice.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = Invoice;
