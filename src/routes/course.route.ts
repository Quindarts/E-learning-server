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
const course = express.Router();
course.get(ROUTE.COURSE_FILTER, filterCourse);
course.get(ROUTE.CATEGORY, getCategories);
course.get(ROUTE.BY_ID, getCourseById);
course.get(ROUTE.INDEX, getAllCourses);
course.delete(ROUTE.BY_ID, removeCourse);
course.post(ROUTE.INDEX, createCourse);

export default course;
