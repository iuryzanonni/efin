import { authorize } from "../../../src/service/authService";
import { HttpMethod } from "../../../src/utils/HttpMethod";
import { findMonthlyInvoiceByUserId, saveMonthlyInvoice } from "../../../src/repositories/monthlyInvoiceRepository";
import User from "../../../src/models/User";
import { createInvoices } from "../../../src/service/monthlyInvoices";

export default async function handler(req, res) {
  switch (req.method) {
    case HttpMethod.POST:
      authorize(req, res, async function () {
        const user = await User.findByPk(req.query.userId);

        if (!user) {
          return res.status(401).send("User not found");
        }

        const monthlyInvoices = await findMonthlyInvoiceByUserId(user.dataValues.id);
        await createInvoices({
          monthlyInvoices,
          month: req.query.month,
          year: req.query.year,
        })
          .then((data) => res.status(201).send("Faturas criadas"))
          .catch((error) => console.log(error));
      });
      break;
    default:
      break;
  }
}
