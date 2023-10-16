import winston from "winston";
require("winston-daily-rotate-file");
import path from "path";

const infoLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: "info-file",
      filename: path.join(__dirname, "../", "logs", "filelog-info.log"),
      level: "info",
    }),
  ],
});

const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: "internal-error",
      filename: path.join(__dirname, "../", "logs", "internal-error.log"),
      level: "error",
    }),
  ],
});

export default {
  errorLogger,
  infoLogger,
};
//https://www.npmjs.com/package/winston-daily-rotate-file
