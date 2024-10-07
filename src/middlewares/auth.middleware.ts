import jwt from "@/helper/jwt";
import { Request, Response, NextFunction } from "express";

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const verified: any = jwt.verifyToken("access", token.split(" ")[1]);
    if (verified.expired) {
      return res.status(403).json({ message: "Token expired" });
    }
    if (
      typeof verified !== 'object'
    ) return res.status(401).json({ message: "Invalid token payload" });
    req.body.userId = verified.payload.data.id;

    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyAuth;
