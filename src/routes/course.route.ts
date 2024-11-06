import ROUTE from "@/constant/Routes";
import express from "express";
import {
  createCourse,
  getCourseById,
  getAllCourses,
  removeCourse,
  filterCourse,
  getCategories,
} from "@/controllers/course.controller";
import { createReview } from "@/controllers/review.controller";
import { verifyAuth } from "@/middlewares/auth.middleware";
const course = express.Router();

course.get(ROUTE.COURSE_FILTER, filterCourse);
course.get(ROUTE.CATEGORY, getCategories);
course.get(ROUTE.BY_ID, getCourseById);
course.get(ROUTE.INDEX, getAllCourses);
course.delete(ROUTE.BY_ID, removeCourse);

//TODO : Add review to course
course.post(ROUTE.REVIEW, verifyAuth, createReview);

course.post(ROUTE.INDEX, createCourse);

export default course;
