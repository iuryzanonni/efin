const { Op } = require("sequelize");
const md5 = require("md5");

import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const user = User.findOne({ where: { email: req.query.email } });
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "POST") {
    const user = req.body;
    user["password"] = md5(user.password + process.env.NEXT_MD5_HASH);

    if (!user.roles) {
      user["roles"] = "USER";
    }

    await User.create(user)
      .then((data) => res.status(200).send("User created successfully"))
      .catch((ex) => res.status(401).send(ex));
  }
}
