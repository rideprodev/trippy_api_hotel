import { Router } from "express";
import HttpStatus from "http-status";
import path from "path";
import loggers from "../services/logger";
import utility from "../services/utility";
import customRoute from "./customRoute";
import grnRoute from "./grnRoute";
import hotelRoute from "./hotelRoute";
import biddingRoute from "./biddingRoute";
import bookingRoute from "./bookingRoute";

const router = Router();
const register = (app) => {
  app.use(router);
  // console.log(path.join(`${__dirname}/../../build/index.html`));
  app.get("/*", (req, res) => {
    if (!req.path.includes("/api")) {
      res.sendFile(path.join(`${__dirname}/../../build/index.html`));
    }
  });

  router.use("/api/v1", [
    router.use("/custom", customRoute),
    router.use("/hotel", [grnRoute, hotelRoute]),
    router.use("/bidding", biddingRoute),
    router.use("/booking", bookingRoute),
  ]);

  app.use((error, req, res, next) => {
    if (!error.status || error.status == HttpStatus.INTERNAL_SERVER_ERROR) {
      loggers.errorLogger.error(`internal error ${new Date()} ${error}`);
      console.log("internal error", `${new Date()}`, error.status, error);
    }
    utility.getError(
      res,
      error.status == HttpStatus.INTERNAL_SERVER_ERROR
        ? "Internal Server Error"
        : error.message,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  });

  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = HttpStatus.NOT_FOUND;
    utility.getError(res, error.message, error.status);
  });
};
export default register;
