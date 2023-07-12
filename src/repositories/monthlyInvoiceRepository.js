const MonthlyInvoice = require("../models/MonthlyInvoice");

exports.findMonthlyInvoiceByUserId = async (userId) => {
  const monthlyInvoices = await MonthlyInvoice.findAll({
    where: {
      userId,
    },
  });

  return monthlyInvoices;
};

exports.saveMonthlyInvoice = async (data) => {
  await MonthlyInvoice.create(data);
};
