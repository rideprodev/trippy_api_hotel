import winston from "winston";
require("winston-daily-rotate-file");
import path from "path";
import moment from "moment";

const year = moment.utc().format("YYYY");

const infoLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: "info-file",
      filename: path.join(__dirname, "../", `logs/${year}`, "filelog-info.log"),
      level: "info",
    }),
  ],
});

const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: "internal-error",
      filename: path.join(
        __dirname,
        "../",
        `logs/${year}`,
        "internal-error.log"
      ),
      level: "error",
    }),
  ],
});

const requestErrorLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      name: "request-error",
      filename: path.join(
        __dirname,
        "../",
        `logs/${year}`,
        "request-error.log"
      ),
      level: "error",
    }),
  ],
});

const grnLogger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      name: "grn-logs",
      filename: path.join(
        __dirname,
        "../",
        `logs/${year}/%DATE%`,
        "grn-logs.log"
      ),
      datePattern: "YYYY-MM-DD",
      level: "info",
    }),
  ],
});

export default {
  errorLogger,
  infoLogger,
  requestErrorLogger,
  grnLogger,
};
//https://www.npmjs.com/package/winston-daily-rotate-file
