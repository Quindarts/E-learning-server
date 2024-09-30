import { LessonType } from "@/types/lesson.type";
import Error from "@/utils/errors"
import { Request, Response } from "express";
import Course from "@/models/course.model"
import HTTP_STATUS from "@/constant/HttpStatus";
import HelperRandom from "@/helper/random";
interface RequestBody {
    name: string;
    description?: string;
    author: string;
    category?: string;
    imgUrls?: string[];
    price: number;
    startDate: Date;
    endDate: Date;
    lessons?: LessonType[];
}
export const createCourse = async (req: Request, res: Response) => {
    const { name, description, author, category, imgUrls, price, lessons, startDate, endDate }: RequestBody = req.body;
    try {
        const code = HelperRandom.generateCourseCode(6)
        const course = await Course.create({
            name, description, author, category, imgUrls, price, lessons, startDate, endDate, code
        })
        if (!course) {
            return Error.sendNotFound(res, 'Create failed!')
        }

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create Success',
            course
        })
    } catch (error: any) {
        return Error.sendError(res, error)
    }
}
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id).lean()
        if (!course) {
            return Error.sendNotFound(res, 'No course found')
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: "Get course success !",
            course
        })
    } catch (error: any) {
        console.log("🚀 ~ getById ~ error:", error)
        return Error.sendError(res, error)
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const course = await Course.find().lean()
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: "Get all courses success !",
            course,
            totals: course.length
        })

    } catch (error: any) {
        Error.sendError(res, error)
    }
}
export const removeCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id).lean()
        if (!course) {
            return Error.sendNotFound(res, 'No course found')
        }
        await Course.findByIdAndDelete(id)
        return res.status(HTTP_STATUS.CONTINUE).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Delete Success',
        })
    } catch (error: any) {
        return Error.sendError(res, error)
    }
}