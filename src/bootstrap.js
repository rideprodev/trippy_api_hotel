import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import helmet from "helmet";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routes from "./routes";
import models from "./models";
import config from "./config";
import loggers from "./services/logger";
import logger from "morgan";
import path from "path";
import scheduleJob from "./services/schedule-job";
import schedule from "node-schedule";
// import socket from "./socket";
/**
 * Application startup class
 *
 * @export
 * @class Bootstrap
 */
export default class Bootstrap {
  /**
   * Creates an instance of Bootstrap.
   * @param {object} app
   *
   * @memberOf Bootstrap
   */
  constructor(app) {
    this.app = app;
    this.middleware();
    this.connectDb();
    this.routes();
    this.start();
  }

  /**
   * Load all middleware
   * @memberOf Bootstrap
   */
  middleware() {
    const { app } = this;
    const swaggerDefinition = {
      info: {
        title: "REST API for Trippy Bid Application",
        version: "1.0.0",
        description: "This is the REST API for Trippy Bid Application",
      },
      host: `${config.app.swaggerHost}`,
      basePath: "/api",
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          description: "JWT authorization of an API",
          name: "Authorization",
          in: "header",
        },
      },
    };

    const options = {
      swaggerDefinition,
      apis: ["./api-docs/*.yaml"],
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.use(
      cors({
        "Access-Control-Allow-Origin": `https://${config.app.baseUrl}`,
      })
    );
    if (config.app.environment === "development") {
      app.use(logger("tiny"));
    }
    app.use(bodyParser.json({ limit: "500mb", extended: true }));
    app.use(
      bodyParser.urlencoded({
        limit: "500mb",
        extended: true,
        parameterLimit: 50000,
      })
    );
    app.use(compression());
    app.use(methodOverride());
    app.use(helmet());
    app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
    app.use(
      helmet({
        referrerPolicy: { policy: "no-referrer" },
      })
    );
    if (
      config.app.environment == "development" ||
      config.app.environment == "staging"
    ) {
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/assets", express.static(`${__dirname}/uploads`));
    app.use("/images", express.static(`${__dirname}/images`));
    app.use("/public", express.static(`${__dirname}/../public`));
    app.use(express.static(path.join(`${__dirname}/../build`)));

    app.use((req, res, next) => {
      if (req.secure) {
        config.app.setBaseUrl(`https://${req.headers.host}/`);
      } else {
        config.app.setBaseUrl(`http://${req.headers.host}/`);
      }
      next();
    });
    // app.use("/api/", appVersionMiddleware);
  }

  /**
   * Check database connection
   * @memberOf Bootstrap
   */
  connectDb() {
    const { sequelize } = models;
    sequelize
      .authenticate()
      .then(async () => {
        console.log("Connected to database");
        loggers.infoLogger.info("Database connected successfully");
        await sequelize
          .sync()
          .then(() => {
            loggers.infoLogger.info("Database sync successfully");
          })
          .catch((error) => {
            console.log(error);
            loggers.infoLogger.error("Database syncing error %s", error);
          });
      })
      .catch((error) => {
        console.log(error);
        loggers.errorLogger.error("Database connection error %s", error);
      });
  }

  /**
   * Load all routes
   * @memberOf Bootstrap
   */
  routes() {
    routes(this.app);
  }

  /**
   * Start express server
   * @memberOf Bootstrap
   */
  start() {
    const { app } = this;
    const port = app.get("port");
    const server = app.listen(port, () => {
      console.log("Server has started on port %d", port);
    });
    // delete unused media from media temp
    this.scheduleJob();
    //socket
    // socket(server);
  }

  /**
   * Execute schedule job
   * @memberOf Bootstrap
   */
  scheduleJob() {
    // if (config.app.environment !== "development") {
    schedule.scheduleJob("0 0 20 * * *", (fireDate) => {
      scheduleJob.AutoPayment();
    });

    schedule.scheduleJob("0 0 20 * * *", (fireDate) => {
      scheduleJob.AutoBookingOnBidding();
    });
    // }
  }
}
