const authService = require("../../../src/service/authService");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await authService.decodeToken(req.query.token);

      res.status(200).send({ data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
