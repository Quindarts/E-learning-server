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

    // Check if token is valid (has "Bearer" part)
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return Error.sendUnauthenticated(res);
    }

    // Verify token
    const verified = jwt.verifyToken("access", tokenParts[1]);

    // Check if token is expired
    if (verified.expired) {
      return Error.sendForbidden(res, "Token expired");
    }

    // Check if payload is valid
    if (
      !verified.payload ||
      typeof verified.payload === "string" ||
      !("data" in verified.payload)
    ) {
      return Error.sendUnauthenticated(res);
    }

    // Attach user ID to the request body
    req.body.userId = verified.payload.data.id;

    // Move to the next middleware or route
    next();
  } catch (error) {
    // Handle token verification errors
    return Error.sendUnauthenticated(res);
  }
};

export default verifyAuth;
