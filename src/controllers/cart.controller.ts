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
    const user = await User.findById(userId).populate('carts.items.course');
    if (!user) {
      return Error.sendNotFound(res, "User not found");
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return Error.sendNotFound(res, "Course not found");
    }

    // Check if the course is already in the cart
    if (!user.carts) {
      return Error.sendNotFound(res, "User cart not found");
    }

    const courseInCart = user.carts.items.find(
      (item: any) => item.course.toString() === courseId
    );

    if (courseInCart) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Course already in cart",
      });
    }

    // Add course to the user's cart
    user.carts.items.push({
      course: courseId,
      quantity: 1,
    });
    user.carts.totalPrice += course.price;

    await user.save();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Course added to cart",
      cart: user,
    });
  } catch (error: any) {
    return Error.sendError(res, error);
  }
};
