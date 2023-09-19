import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { customController } = controllers;
const { authMiddleware, resourceAccessMiddleware, validateMiddleware } =
  middlewares;

const router = Router();

router.get("/", customController.getAllPlaces);

router.get(
  "/admin/:objectName",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  customController.getAllObjectList
);

export default router;
