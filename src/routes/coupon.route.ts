import ROUTE from "@/constant/Routes";
import { addCouponByUser } from "@/controllers/coupon.controller";
import { isUser } from "@/middlewares/auth.middleware";
import express from "express";

const coupon = express.Router();

coupon.post(ROUTE.INDEX, isUser, addCouponByUser);

export default coupon;
