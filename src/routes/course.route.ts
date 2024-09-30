import ROUTE from "@/constant/Routes";
import express from "express"
import { createCourse, getCourseById, getAllCourses, removeCourse } from "@/controllers/course.controller"
const course = express.Router();

course.get(ROUTE.BY_ID, getCourseById)
course.get(ROUTE.INDEX, getAllCourses)
course.delete(ROUTE.BY_ID, removeCourse)
course.post(ROUTE.INDEX, createCourse)
export default course
