import { Request, Response } from "express";
import User from "@/models/user.model"; // Assuming User model is imported
import Course from "@/models/course.model";
import HTTP_STATUS from "@/constant/HttpStatus";
import Error from "@/utils/errors";

export const addCourseToCart = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = req.body.userId;

    const user = await User.findById(userId).lean();
    if (!user) {
      return Error.sendNotFound(res, "User not found");
    }
    const course = await Course.findById(courseId).lean();
    if (!course) {
      return Error.sendNotFound(res, "Course not found");
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "carts.items.course": { $ne: courseId } },
      {
        $push: { "carts.items": { course: courseId, quantity: 1 } },
        $inc: { "carts.totalPrice": course.price },
      },
      { new: true },
    ).populate("carts.items.course");
    if (!updatedUser) {
      return Error.sendConflict(res, "Course already in cart");
    }
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Course added to cart",
      cart: updatedUser.carts,
    });
  } catch (error: any) {
    return Error.sendError(res, error);
  }
};
