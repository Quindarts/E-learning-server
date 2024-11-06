const API_VERSION = "/api/v1";
const ROUTE = {
  AUTH: `/auth`,
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  CHANGE_PASSWORD: "/change",
  FORGOT_PASSWORD: "/forgot-password",
  GENERATE_ACCESSTOKEN: "/accessToken-generate",

  CART: "/cart",
  COUPON: '/coupons',
  ADD_TO_CART: "/add-to-cart",
  INDEX: "/",
  BY_ID: "/:id",
  COURSE: `/courses`,
  REVIEW: "/:id/reviews",
  COURSE_FILTER: "/filter",
  CATEGORY: "/categories",
  LESSONS: "/lessons",

  ORDER: "/orders",
  SAVING_ORDER: "/saving-order",
  PAYMENT: "/payment",
};
export default ROUTE;
