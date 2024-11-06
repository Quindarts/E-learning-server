import HTTP_STATUS from "@/constant/HttpStatus";
import Course from "@/models/course.model";
import Review from "@/models/review.model";
import Error from "@/utils/errors";
import { Request, Response } from "express";

const createReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user, comment, rating } = req.body;

        const course = await Course.findById(id);

        if (!course) {
            return Error.sendNotFound(res, "No course found");
        }
        const review = new Review({
            user,
            comment,
            rating,
        });

        const savedReview = await review.save();
        
        course.reviews.push(savedReview);
        course.totalReview += 1;

        await course.save();

        res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            message: "Review added successfully",
            review: savedReview,
        });
    } catch (error: any) {
        console.error("Error adding review:", error);
        Error.sendError(res, error);
    }
};

export {
    createReview
}