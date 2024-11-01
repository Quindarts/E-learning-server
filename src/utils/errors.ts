import HTTP_STATUS from "@/constant/HttpStatus";
import { Response } from "express";

const sendError = (res: Response, error: Error) => {
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: 500,
    message: error.message,
  });
};

const sendForbidden = (res: Response, msg: string) => {
  res.status(HTTP_STATUS.FORBIDDEN).json({
    success: false,
    status: 403,
    message: msg,
  });
};

const sendWarning = (res: Response, msg: string) => {
  res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    status: 400,
    message: msg,
  });
};

const sendUnauthenticated = (res: Response) => {
  res.status(HTTP_STATUS.UNAUTHORIZED).json({
    success: false,
    status: 401,
    msg: "Unauthenticated",
  });
};

const sendNotFound = (res: Response, msg: String) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    status: 404,
    message: msg,
  });
};

const sendConflict = (res: Response, msg: string) => {
  res.status(HTTP_STATUS.CONFLICT).json({
    success: false,
    status: 409,
    message: msg,
  });
};

export default {
  sendConflict,
  sendError,
  sendForbidden,
  sendNotFound,
  sendWarning,
  sendUnauthenticated,
};
