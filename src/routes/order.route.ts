import ROUTE from "@/constant/Routes";
import express from "express";
import {
  createOrder,
  changeStatusOfOrder,
  savingOrder,
} from "@/controllers/order.controller";
import { isUser } from "@/middlewares/auth.middleware";

const order = express.Router();

order.post(ROUTE.INDEX, isUser, createOrder);
order.put(ROUTE.BY_ID, isUser, changeStatusOfOrder);
order.post(ROUTE.SAVING_ORDER, isUser, savingOrder);

export default order;
