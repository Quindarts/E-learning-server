
// Create Order -> POST /api/orders: body { user info,coupon } -> return orderId and saving to redis
// Click checkout -> POST /api/payment: body { orderId, paymentMethod }

import ROUTE from "@/constant/Routes";

import express from "express";
import { createOrder } from "@/controllers/";

const order = express.Router();

order.post(ROUTE.ORDER, createOrder)