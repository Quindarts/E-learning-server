import { Request, Response } from "express";
import User from "@/models/user.model"; // Assuming User model is imported
import Course from "@/models/course.model";
import HTTP_STATUS from "@/constant/HttpStatus";
import Error from "@/utils/errors";

export const addCourseToCart = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body; // The course ID sent in the request body
    console.log(req.body);
    const userId = req.body.userId; // Extracted from the middleware

    // Find the user by ID
    const user = await User.findById(userId).lean();
    if (!user) {
      return Error.sendNotFound(res, "User not found");
    }

    // Find the course by ID
    const course = await Course.findById(courseId).lean();
    if (!course) {
      return Error.sendNotFound(res, "Course not found");
    }

    // Find user by ID and add course to cart if not already in it
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "carts.items.course": { $ne: courseId } }, // Find user where course is not already in cart
      {
        $push: { "carts.items": { course: courseId, quantity: 1 } }, // Add course to cart
        $inc: { "carts.totalPrice": course.price }, // Increase total price
      },
      { new: true } // Return the updated user
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
