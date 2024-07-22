import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { schedulerController } = controllers;
const {} = middlewares;

const router = Router();
// ------------ Backend Apis Start -----------------------

router.get("/auto-pay", schedulerController.autoPayemnt);

export default router;
