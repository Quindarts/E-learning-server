import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  PORT: process.env.PORT || 5001,
  clientURL: process.env.CLIENT_URL || "http://localhost:3000",

  db: {
    userName: process.env.CLOUD_DB_USERNAME,
    password: process.env.CLOUD_DB_PASSWORD,
    url: process.env.CLOUD_DB_URL,
  },
  db_image: {
    cloud_name: process.env.CLOUD_IMAGE_NAME,
    api_key: process.env.CLOUD_IMAGE_API_KEY,
    api_secret: process.env.CLOUD_IMAGE_API_SECRET,
  },
  vnp_TmnCode: process.env.VNP_TMNCODE,
  vnp_HashSecret: process.env.VNP_HASH_SECRET,
  vnp_Url: process.env.VNP_URL,
  vnp_Api: process.env.VNP_API,
  vnp_ReturnUrl: process.env.VNP_RETURN_URL,
};

export default appConfig;
