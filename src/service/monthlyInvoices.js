const { saveInvoices } = require("../repositories/invoiceRepository");

exports.createInvoices = async (data) => {
  const invoices = [];

  data.monthlyInvoices.map(async (monthlyInvoice) => {
    const invoice = monthlyInvoice.dataValues;

    const dueDate = new Date(data.year, data.month - 1, monthlyInvoice.dueDay);

    invoice.installments = 1;
    invoice.isMonthly = true;
    invoice.dueDate = dueDate;

    delete invoice.active;
    delete invoice.dueDay;
    delete invoice.id;
    delete invoice.createdAt;
    delete invoice.updatedAt;
    invoices.push(invoice);
  });

  await saveInvoices(invoices);
};
