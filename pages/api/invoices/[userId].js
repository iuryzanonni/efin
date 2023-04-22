import Invoice from "../../../src/models/Invoice";
import { authorize } from "../../../src/service/authService";
const { Op } = require("sequelize");

const requireAuth = (req, res, next) => {};

export default async function handler(req, res) {
  if (req.method === "GET") {
    authorize(req, res, async function () {
      const userId = req.query.userId;

      await Invoice.findAll({
        where: {
          userId: {
            [Op.eq]: userId,
          },
        },
      })
        .then((data) => res.status(200).send(data))
        .catch((ex) => res.status(404).send("Invoice created successfully"));
    });
  }

  if (req.method === "POST") {
    authorize(req, res, async function () {
      const invoice = req.body;
      const userId = req.query.userId;

      invoice["userId"] = userId;

      await Invoice.create(invoice)
        .then((data) => res.status(200).send("Invoice created successfully"))
        .catch((ex) => res.status(401).send(ex));
    });
  }
}
