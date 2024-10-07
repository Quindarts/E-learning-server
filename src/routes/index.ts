import 'module-alias/register';
import { Express } from 'express';
import auth from './auth.route';
import ROUTE from "@/constant/Routes";
import course from './course.route';
import cart from './cart.route';

function router(app: Express) {
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.COURSE, course)
    app.use(ROUTE.CART, cart)
}
export default router