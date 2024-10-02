import ROUTE from "@/constant/Routes";
import { login, register } from "@/controllers/auth.controller";
import getUserIdFromToken from "@/middlewares/auth.middleware";
import express from "express";
const auth = express.Router();

auth.post(ROUTE.LOGIN, login);
auth.post(ROUTE.REGISTER, register);

export default auth;
