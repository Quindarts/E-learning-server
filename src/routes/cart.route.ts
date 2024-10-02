import ROUTE from "@/constant/Routes";
import { addCourseToCart } from "@/controllers/cart.controller";
import verifyAuth from "@/middlewares/auth.middleware";
import express from "express";

const cart = express.Router();

cart.put(ROUTE.ADD_TO_CART, verifyAuth, addCourseToCart);

export default cart;
