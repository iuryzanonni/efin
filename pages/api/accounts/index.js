const md5 = require("md5");

import User from "../../../src/models/User";
import { HttpMethod } from "../../../src/utils/HttpMethod";

export default async function handler(req, res) {
  switch (req.method) {
    case HttpMethod.GET:
      try {
        const user = User.findOne({ where: { email: req.query.email } });
        res.status(200).json({ user });
      } catch (error) {
        console.log(error);
      }
      break;
    case HttpMethod.POST:
      const user = req.body;
      user["password"] = md5(user.password + process.env.NEXT_PUBLIC_MD5_HASH);

      if (!user.roles) {
        user["roles"] = "USER";
      }

      await User.create(user)
        .then((data) => res.status(200).send("User created successfully"))
        .catch((ex) => res.status(401).send(ex));
      break;
  }
}
