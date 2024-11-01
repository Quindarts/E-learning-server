import { RedisServices } from "@/utils/redis";
import { Request, Response } from "express";
import dotenv from "dotenv";
import moment from "moment";
import HTTP_STATUS from "@/constant/HttpStatus";
import Order from "@/models/order.model";
dotenv.config();
enum PAYMENT_METHOD {
  "ONLINE",
  "OFFLINE",
}
enum STATUS_ORDER {
  "PAID",
  "UNPAID",
  "SHIPPING",
}
interface VnpParamsType {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string | any;
  vnp_CreateDate: string;
  vnp_BankCode: string | any;
  vnp_SecureHash: string;
}

const redis = new RedisServices();

// const totalPayMent = (items: any[], percentNumber: number) => {
//     return items.reduce((acc, item) => acc + item.course.price * item.quantity, 0) * percentNumber;
// }
const getOrder = async (orderId: string) => {
  return await redis.getKeyValue(orderId);
};

const getValueOfCoupon = async (couponCode: string) => {
  if (await isValidCoupon(couponCode)) {
    return await redis.getKeyValue(couponCode);
  }
  return 1;
};
const clearOrder = (orderId: string) => {
  redis.deleteKey(orderId);
};
const isValidCoupon = async (coupon: string) => {
  return await redis.isExistKey(coupon);
};

const generateVNPayUrl = async (req: Request, res: Response) => {
  const { orderId, paymentMethod, bankCode, couponCode } = req.body;
  // const order = await Order.findById(orderId).lean()
  // if (!order) {
  //     return res.status(HTTP_STATUS.NOT_FOUND).json({
  //         success: false,
  //         message: 'Order not found',
  //         code: '97',
  //     })
  // }
  // console.log("🚀 ~ generateVNPayUrl ~ order:", order)

  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  let ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  let tmnCode = `${process.env.VNP_TMNCODE}`;
  let secretKey = `${process.env.VNP_HASH_SECERT}`;
  let vnpUrl = `${process.env.VNP_URL}`;
  let returnUrl = `${process.env.VNP_RETURN_URL}`;
  let locale = "vn";
  let currCode = "VND";
  let amount = 100000;

  let vnp_Params: Partial<VnpParamsType> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: 12000000,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params.vnp_SecureHash = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return vnpUrl;
};

const createPayment = async (req: Request, res: Response) => {
  const vnpUrl = await generateVNPayUrl(req, res);
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Payment success",
    code: "00",
    data: vnpUrl,
  });
};
// const createPayment = async (req: Request, res: Response) => {
//     return res.status(HTTP_STATUS.OK).json({})
// }

const getPaymentSuccess = async (req: Request, res: Response) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  let tmnCode = `${process.env.VNP_TMNCODE}`;
  let secretKey = `${process.env.VNP_HASH_SECERT}`;
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  const order_id = vnp_Params["vnp_TxnRef"];
  if (secureHash === signed) {
    const currentOrder = await redis.getKeyValue(`${order_id}`);
    if (!currentOrder) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Payment failed, no order provided",
        code: "97",
      });
    }
    const convertOrder = JSON.parse(currentOrder);
    const resultChange = await Order.findOneAndUpdate(
      {
        _id: order_id,
      },
      {
        $set: {
          status: STATUS_ORDER.PAID,
        },
        $pull: {
          paymentMethod: PAYMENT_METHOD.ONLINE,
        },
      },
      {
        new: true,
      },
    );
    const isDelOrderRedis = await redis.deleteKey(order_id);
    if (isDelOrderRedis == 1) {
      console.log("Key has been deleted");
    } else {
      console.log("Key does not exist");
    }
    return res.redirect(
      `${process.env.CLIENT_URL}/payment-success?code=${order_id}`,
    );
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Payment failed",
      code: "97",
    });
  }
};
function sortObject(obj: Record<string, number | string> | any) {
  let sorted: { [key: string]: any } = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export { createPayment, getPaymentSuccess };
