import { authorize } from "../../../src/service/authService";
import { HttpMethod } from "../../../src/utils/HttpMethod";
import { findMonthlyInvoiceByUserId, saveMonthlyInvoice } from "../../../src/repositories/monthlyInvoiceRepository";
import User from "../../../src/models/User";

export default async function handler(req, res) {
  switch (req.method) {
    case HttpMethod.GET:
      authorize(req, res, async function () {
        const user = await User.findByPk(req.query.userId);

        if (!user) {
          return res.status(401).send("User not found");
        }

        await findMonthlyInvoiceByUserId(user.dataValues.id)
          .then((data) => res.status(200).send(data))
          .catch((error) => console.log(error));
      });
      break;
    case HttpMethod.POST:
      authorize(req, res, async function () {
        const monthlyInvoice = req.body;
        const user = await User.findByPk(req.query.userId);

        if (!user) {
          return res.status(401).send("User not found");
        }

        monthlyInvoice["userId"] = user.dataValues.id;
        console.log("Teste: ", user);

        await saveMonthlyInvoice(monthlyInvoice)
          .then((data) => res.status(200).send("Monthly Invoice created successfully"))
          .catch((ex) => res.status(401).send(ex));
      });
      break;

    default:
      break;
  }
}
