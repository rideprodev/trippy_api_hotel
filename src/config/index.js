import path from "path";
import dotenv from "dotenv";

dotenv.config();
export default {
  app: {
    siteName: "Trippy Bid",
    siteEmail: "",
    mediaStorage: process.env.MEDIA_STORAGE,
    mediaUploadSizeLimit: 1024 * 1024 * 100,
    baseUrl: process.env.BASE_URL,
    adminUrl: process.env.ADMIN_URL,
    environment: process.env.NODE_ENV,
    swaggerHost: process.env.SWAGGER_HOST,
    currency: process.env.CURRENCY_ABBR,
    languages: ["en"],
    setBaseUrl(url) {
      this.baseUrl = url;
    },
  },
  database: {
    mysql: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
      timezone: "+00:00",
    },
  },
  // mail: {
  //   from_name: process.env.SMTP_EMAIL_FROM_NAME,
  //   from_email: process.env.SMTP_EMAIL_FROM_EMAIL,
  //   is_smtp: true,
  //   smtp: {
  //     host: process.env.SMTP_HOST,
  //     port: process.env.SMTP_HOST_PORT,
  //     user: process.env.SMTP_USERNAME,
  //     password: process.env.SMTP_PASSWORD,
  //     isSecure: false,
  //   },
  // },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN,
};
