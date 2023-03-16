"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoice", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment: {
        type: Sequelize.DATE,
      },
      isMonthly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invoice");
  },
};
