import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { hotelController } = controllers;
const { authMiddleware, resourceAccessMiddleware, validateMiddleware } =
  middlewares;

const router = Router();

router.get(
  "/admin",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelController.getAllHotels
);

export default router;
