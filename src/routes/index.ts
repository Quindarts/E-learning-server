import { Express } from 'express';
import auth from './auth.route';
import ROUTE from "@/constant/Routes";

function router(app: Express) {
    app.use(ROUTE.AUTH, auth)
}
export default router