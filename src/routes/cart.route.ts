import ROUTE from "@/constant/Routes";
import { addCourseToCart, clearCart } from "@/controllers/cart.controller";
import { isUser, verifyAuth } from "@/middlewares/auth.middleware";
import express from "express";

const cart = express.Router();

cart.post(ROUTE.COURSE, verifyAuth, addCourseToCart);
cart.delete(ROUTE.COURSE, isUser, clearCart)

export default cart;
