import User from "@/models/user.model";
import jwt from "@/helper/jwt";
import { Request, Response, NextFunction } from "express";
import Error from "@/utils/errors";
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

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
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
    const user = await User.findById(verified.payload.data.id).lean();
    req.body.user = user;
    next();
  } catch (error) {
    return Error.sendUnauthenticated(res);
  }
};

export { isUser, verifyAuth };
