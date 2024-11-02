import HTTP_STATUS from "@/constant/HttpStatus";
import random from "@/helper/random";
import User from "@/models/user.model";
import Error from "@/utils/errors";
import { Request, Response } from "express";
const addCouponByUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body
        const { discount } = req.body
        const code = random.generateCourseCode(6)
        const newUser = await User.findOneAndUpdate({
            id: user.id
        }, {
            $push: {
                coupons: { code: code, discount: discount }
            }
        }, {
            new: true
        })
        return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            message: 'Saved coupon success',
            success: true,
            user: newUser
        })
    } catch (error: any) {
        console.log("🚀 ~ addCoupon ~ error:", error)
        Error.sendError(res, error)
    }
}
export {
    addCouponByUser
}