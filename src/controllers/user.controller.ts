import HTTP_STATUS from "@/constant/HttpStatus";
import User from "@/models/user.model";
import Error from "@/utils/errors";
import { Response, Request } from "express";

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return Error.sendNotFound(res, "User not found");
    }
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Get user success",
      user,
    });
  } catch (error: any) {
    console.log("🚀 ~ get ~ error:", error);
    Error.sendError(res, error);
  }
};
export const findById = async () => {};
