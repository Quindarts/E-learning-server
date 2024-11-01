import { LessonType } from "@/types/lesson.type";
import Error from "@/utils/errors";
import { Request, Response } from "express";
import Course from "@/models/course.model";
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
  const {
    name,
    description,
    author,
    category,
    imgUrls,
    price,
    lessons,
    startDate,
    endDate,
  }: RequestBody = req.body;
  try {
    const code = HelperRandom.generateCourseCode(6);
    const course = await Course.create({
      name,
      description,
      author,
      category,
      imgUrls,
      price,
      lessons,
      startDate,
      endDate,
      code,
    });
    if (!course) {
      return Error.sendNotFound(res, "Create failed!");
    }

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: "Create Success",
      course,
    });
  } catch (error: any) {
    return Error.sendError(res, error);
  }
};
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    if (!course) {
      return Error.sendNotFound(res, "No course found");
    }
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: "Get course success !",
      course,
    });
  } catch (error: any) {
    console.log("🚀 ~ getById ~ error:", error);
    return Error.sendError(res, error);
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const course = await Course.find().lean();
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: "Get all courses success !",
      course,
      totals: course.length,
    });
  } catch (error: any) {
    Error.sendError(res, error);
  }
};
export const removeCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).lean();
    if (!course) {
      return Error.sendNotFound(res, "No course found");
    }
    await Course.findByIdAndDelete(id);
    return res.status(HTTP_STATUS.CONTINUE).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: "Delete Success",
    });
  } catch (error: any) {
    return Error.sendError(res, error);
  }
};

// filter courses
//http://example.com/api/courses?category=a&category=b
interface CourseFilterQuery {
  offset?: string;
  limit?: string;
  sortField?: string;
  sortType?: "asc" | "desc";
  category?: string;
  author?: string;
  minPrice?: string;
  maxPrice?: string;
  keywords?: string;
}

export const filterCourse = async (req: Request, res: Response) => {
  const {
    offset,
    limit,
    sortField,
    sortType,
    category,
    author,
    minPrice,
    maxPrice,
    keywords,
  }: CourseFilterQuery = req.query;
  console.log("hello");
  // Tạo query mặc định để filter các courses active
  let query: any = { isActive: true };

  // Filter theo khoảng giá
  if (minPrice || maxPrice) {
    query["price"] = {
      ...(minPrice ? { $gte: parseInt(minPrice) } : {}),
      ...(maxPrice ? { $lte: parseInt(maxPrice) } : {}),
    };
  }

  // Filter theo từ khóa (tìm trong tên hoặc mô tả)
  if (keywords && sortField) {
    query[sortField] = { $regex: keywords, $options: "i" }; // Tìm kiếm không phân biệt hoa thường
  }

  // Filter theo danh mục (category)
  if (category) {
    const categories = Array.isArray(category) ? category : [category];
    query["category"] = { $in: categories };
  }

  // Filter theo tác giả (author)

  try {
    const courses = await Course.find(query)
      .limit(limit ? parseInt(limit) : 10)
      .skip(
        offset ? (parseInt(offset) - 1) * (limit ? parseInt(limit) : 10) : 0,
      )
      .sort({
        ...(sortField && sortType ? { [sortField]: sortType } : {}),
      })
      .sort({ createdAt: -1 })
      .lean();

    // Tính tổng số trang
    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / (limit ? parseInt(limit) : 10));
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      courses,
      pagination: {
        totalCourses,
        totalPages,
        limit: limit ? parseInt(limit) : 10,
        offset: offset ? parseInt(offset) : 1,
      },
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Lọc courses thất bại.",
    });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    // Use MongoDB's distinct method to get unique categories
    const categories = await Course.distinct("category");
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      categories,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};
