import jwt from "@/helper/jwt";
import { Request, Response, NextFunction } from "express";
import Error from "@/utils/errors"; // Assuming a custom error utility is available

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  // Check if token is present
  if (!token) {
    return Error.sendUnauthenticated(res);
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return Error.sendUnauthenticated(res);
    }

    const verified = jwt.verifyToken("access", tokenParts[1]);

    if (verified.expired) {
      return Error.sendForbidden(res, "Token expired");
    }

    if (
      !verified.payload ||
      typeof verified.payload === "string" ||
      !("data" in verified.payload)
    ) {
      return Error.sendUnauthenticated(res);
    }

    req.body.userId = verified.payload.data.id;

    next();
  } catch (error) {
    return Error.sendUnauthenticated(res);
  }
};

export default verifyAuth;
