import { authorize } from "../../../src/service/authService";
import Invoice from "../../../src/models/Invoice";
import User from "../../../src/models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    authorize(req, res, async function () {
      await Invoice.findAll()
        .then((data) => res.status(200).send(data))
        .catch((ex) => res.status(404).send("Invoices not found."));
    });
  }

  if (req.method === "POST") {
    authorize(req, res, async function () {
      const invoice = req.body;

      const user = await User.findByPk(invoice.userId);

      invoice["user"] = user.dataValues;

      await Invoice.create(invoice)
        .then((data) => res.status(200).send("Invoice created successfully"))
        .catch((ex) => res.status(401).send(ex));
    });
  }
}
