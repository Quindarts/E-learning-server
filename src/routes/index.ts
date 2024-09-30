import { Express } from 'express';
import auth from './auth.route';
import ROUTE from "@/constant/Routes";
import course from './course.route';

function router(app: Express) {
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.COURSE, course)
}
export default router