import Course from '@/models/course.model';
import HTTP_STATUS from "@/constant/HttpStatus";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { ORDER_STATUS } from "@/types/enum";
import Error from "@/utils/errors";
import { Request, Response } from "express";

const createOrder = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const carts = user.carts;
        if (carts.items.length === 0) {
            return Error.sendWarning(res, "Cart is empty");
        }
        const order = await Order.create({
            user: user,
            amount: carts.totalPrice,
            status: ORDER_STATUS.INIT,
        });
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: 201,
            message: "Create order success !",
            order: order,
        });
    } catch (error: any) {
        console.log(error);
        Error.sendError(res, error);
    }
};
const changeStatusOfOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            { _id: orderId },
            { status: status },
            { new: true },
        ).lean();
        if (!order) {
            return Error.sendNotFound(res, "Order not found");
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Order status updated",
            status: 200,
            order: order,
        });
    } catch (error: any) {
        Error.sendError(res, error);
    }
};
const getTotalPrice = (totalOrder: number, discount: number) => {
    let floating_discount = discount / 100
    return totalOrder * floating_discount
}
const savingOrder = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const { couponCode } = req.body;
        const carts = user.carts;
        const my_coupon = user.coupons.find((voucher: { code: string, discount: number }) => voucher.code.includes(couponCode))
        if (!my_coupon) {
            return Error.sendNotFound(res, 'Your coupon not valid.')
        }
        const newOrder = await Order.create({
            user: user,
            amount: couponCode ? getTotalPrice(carts.totalPrice, my_coupon.discount) : carts.totalPrice,
            status: ORDER_STATUS.COMPLETED,
        });
        const updateUser = await User.findOneAndUpdate(
            {
                id: user.id,
            },
            {
                $set: {
                    "carts.items": [],
                    "carts.totalPrice": 0,
                },
                $pull: { coupons: { code: my_coupon.code } },
                $push: {
                    currentCourses: { course: carts.items[0].course, progress: 0, time: new Date() },
                    notifies: { message: 'Congratulations! Your payment was successful. 🎉', date: new Date(), read: false }
                },
            },
            {
                new: true,
            },
        ).populate('currentCourses.course')
        if (!updateUser) {
            return Error.sendNotFound(res, 'Try again, payment failed')
        }
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: "Saving order success",
            status: HTTP_STATUS.CREATED,
            user: updateUser,
            amount: newOrder.amount,
            statusOrder: newOrder.status,
            paymentMethod: 'VNPAY'
        });
    } catch (error: any) {
        console.log("🚀 ~ savingOrder ~ error:", error);
        return Error.sendError(res, error);
    }
};
export { createOrder, changeStatusOfOrder, savingOrder };
