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
  ADD_TO_CART: "/add-to-cart",

  INDEX: "/",
  BY_ID: "/:id",
  COURSE: `/courses`,
  COURSE_FILTER: "/filter",
  LESSONS: "/lessons",
  REVIEW: "/reviews",
};
export default ROUTE;
