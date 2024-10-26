import express from "express";
import ROUTE from "@/constant/Routes";

import { createPayment, getPaymentSuccess } from "@/controllers/payment.controller";
import exp from "constants";

const payment = express.Router();

payment.post(ROUTE.INDEX, createPayment);
payment.get(ROUTE.PAYMENT, getPaymentSuccess);

export default payment;