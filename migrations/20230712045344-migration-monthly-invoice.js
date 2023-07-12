"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MonthlyInvoice", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MonthlyInvoice");
  },
};
