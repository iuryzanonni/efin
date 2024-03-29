import Invoice from "../../../src/models/Invoice";
import { authorize } from "../../../src/service/authService";
import { findByMonthAndWithoutPayment, saveInvoice, updateInvoice } from "../../../src/repositories/invoiceRepository";
import { getFirstAndLastDayOfMonth } from "../../../src/utils/dates";

export default async function handler(req, res) {
  if (req.method === "GET") {
    authorize(req, res, async function () {
      const userId = req.query.userId;

      const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDayOfMonth();

      findByMonthAndWithoutPayment({ userId, firstDayOfMonth, lastDayOfMonth })
        .then((data) => res.status(200).send(data))
        .catch((error) => console.log(error));
    });
  }

  if (req.method === "POST") {
    authorize(req, res, async function () {
      const invoice = req.body;
      const userId = req.query.userId;

      invoice["userId"] = userId;

      await saveInvoice(invoice)
        .then((data) => res.status(200).send("Invoice created successfully"))
        .catch((error) => res.status(404).send(error));
    });
  }

  if (req.method === "PUT") {
    authorize(req, res, async function () {
      const invoice = req.body;

      await updateInvoice(invoice)
        .then((data) => res.status(200).send("Invoice updated successfully."))
        .catch((error) => res.status(404).send(error));
    });
  }
}
