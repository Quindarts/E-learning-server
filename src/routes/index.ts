import "module-alias/register";
import { Express } from "express";
import auth from "./auth.route";
import ROUTE from "@/constant/Routes";
import course from "./course.route";
import cart from "./cart.route";
import order from "./order.route";
import payment from "./payment.route";
import coupon from "./coupon.route";

function router(app: Express) {
  app.use(ROUTE.AUTH, auth);
  app.use(ROUTE.COURSE, course);
  app.use(ROUTE.CART, cart);
  app.use(ROUTE.ORDER, order);
  app.use(ROUTE.PAYMENT, payment);
  app.use(ROUTE.COUPON, coupon)
}

export default router;
