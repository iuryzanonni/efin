const { Op, fn, col } = require("sequelize");
const Invoice = require("../models/Invoice");

exports.findByMonthAndWithoutPayment = async (data) => {
  const { userId, firstDayOfMonth, lastDayOfMonth } = data;

  const invoices = await Invoice.findAll({
    where: {
      userId,
      dueDate: {
        [Op.gte]: firstDayOfMonth,
        [Op.lte]: lastDayOfMonth,
      },
      payment: {
        [Op.is]: null,
      },
    },
    order: [["dueDate", "ASC"]],
  });

  return invoices;
};

exports.saveInvoice = async (data) => {
  await Invoice.create(data);
};
