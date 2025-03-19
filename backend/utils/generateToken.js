import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (userId) => {
  return jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};
