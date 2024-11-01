import Notify from "@/models/notify.model";
import { Request, Response } from "express";
import HTTP_STATUS from "@/constant/HttpStatus";
import Error from "@/utils/errors";

// Create Notification
export const createNotification = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) {
            return Error.sendNotFound(res, "No message");
        }
        const newNotify = await Notify.create({
            message: message,
        });
        return res.status(HTTP_STATUS.CREATED).json({
            isSuccess: true,
            message: "Notification created!",
            status: HTTP_STATUS.CREATED,
            notify: newNotify,
        });
    } catch (error: any) {
        console.error("Error creating notification:", error);
        Error.sendError(res, error);
    }
};

// Get All Notifications
export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notify.find().sort({ date: -1 }).lean();
        return res.status(HTTP_STATUS.OK).json({
            isSuccess: true,
            message: "Notifications fetched successfully",
            status: HTTP_STATUS.OK,
            notifications: notifications,
            total: notifications.length,
        });
    } catch (error: any) {
        Error.sendError(res, error);
    }
};

// Get Single Notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await Notify.findById(id);
        if (!notification) {
            return Error.sendNotFound(res, "Notification not found");
        }
        return res.status(HTTP_STATUS.OK).json({
            isSuccess: true,
            message: "Notification fetched successfully",
            status: HTTP_STATUS.OK,
            notification: notification,
        });
    } catch (error: any) {
        console.error("Error fetching notification by ID:", error);
        Error.sendError(res, error);
    }
};

// Update Notification (Mark as Read)
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedNotification = await Notify.findByIdAndUpdate(
            id,
            { $set: { read: true } },
            { new: true }
        );
        if (!updatedNotification) {
            return Error.sendNotFound(res, "Notification not found");
        }
        return res.status(HTTP_STATUS.OK).json({
            isSuccess: true,
            message: "Notification marked as read",
            status: HTTP_STATUS.OK,
            notification: updatedNotification,
        });
    } catch (error: any) {
        console.error("Error updating notification:", error);
        Error.sendError(res, error);
    }
};

// Delete Notification
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedNotification = await Notify.findByIdAndDelete(id);
        if (!deletedNotification) {
            return Error.sendNotFound(res, "Notification not found");
        }
        return res.status(HTTP_STATUS.OK).json({
            isSuccess: true,
            message: "Notification deleted successfully",
            status: HTTP_STATUS.OK,
            notification: deletedNotification,
        });
    } catch (error: any) {
        console.error("Error deleting notification:", error);
        Error.sendError(res, error);
    }
};
