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
    authUrl: process.env.AUTH_URL,
    environment: process.env.NODE_ENV,
    swaggerHost: process.env.SWAGGER_HOST,
    MailerHost: process.env.MAILER_HOST,
    GRNBaseUrl: process.env.GRN_BASE_URL,
    CureencyConvertUrl: process.env.CURRENCY_CONVERT_URL,
    CurrencyConverterToken: process.env.CURRENCY_CONVERTER_TOKEN,
    GRNPercentageKey: process.env.GRN_PERCENTAGE_KEY,
    biddingLimitOnBooking: process.env.BIDDING_LIMIT_ON_BOOKING,
    currency: process.env.CURRENCY_ABBR,
    BidCharges: process.env.BIDDNG_CHARGES,
    CancellationDaysDifference: process.env.CACELLATION_DAYS_DIFFERENCE,
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
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN,
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    cacheTTLMinutes: parseInt(process.env.CACHE_TTL_MINUTES, 10) || 10,
  },
};
