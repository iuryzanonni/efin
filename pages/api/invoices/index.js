import Invoice from "../../../models/Invoice";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await Invoice.findAll()
      .then((data) => res.status(200).send(data))
      .catch((ex) => res.status(404).send("Invoices not found."));
  }

  if (req.method === "POST") {
    const invoice = req.body;

    const user = await User.findByPk(invoice.userId);

    invoice["user"] = user.dataValues;
    console.log(invoice);
    await Invoice.create(invoice)
      .then((data) => res.status(200).send("Invoice created successfully"))
      .catch((ex) => res.status(401).send(ex));
  }
}
