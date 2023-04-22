const { Op } = require("sequelize");
const md5 = require("md5");

import User from "../../../src/models/User";
const authService = require("../../../src/service/authService");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = await User.findOne({
        attributes: ["id", "name", "lastName", "roles"],
        where: {
          [Op.and]: [{ email: req.body.email }, { password: md5(req.body.password + process.env.NEXT_MD5_HASH) }],
        },
      });

      if (!user) {
        res.status(403).send({
          message: "Invalid email or password.",
        });
        return;
      }

      const token = await authService.generateToken(user.dataValues);

      res.status(201).send({
        token,
        data: user.dataValues,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
