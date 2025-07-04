import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { customController } = controllers;
const { authMiddleware, resourceAccessMiddleware, validateMiddleware } =
  middlewares;

const router = Router();

router.get("/hotel", customController.getAllPlacesHotel);
router.get("/city", customController.getAllPlacesCity);
router.get("/location", customController.getAllPlacesLocation);
router.get("/countries", customController.getAllCountryList);

router.get(
  "/admin/:objectName",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  customController.getAllObjectList
);

export default router;
