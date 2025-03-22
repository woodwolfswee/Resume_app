import axios from "axios";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password, type } = req.body;
      const url = `http://localhost:5000/${type}`;
      const { data } = await axios.post(url, { email, password });

      if (type === "login") {
        res.setHeader("Set-Cookie", `token=${data.token}; HttpOnly; Path=/; Max-Age=3600`);
      }

      res.json(data);
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  } else {
    res.status(405).end();
  }
}
