import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { hotelController } = controllers;
const { authMiddleware, resourceAccessMiddleware } = middlewares;

const router = Router();
// ------------ Backend Apis Start -----------------------

router.get(
  "/admin/get",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelController.getAllHotels
);

router.get(
  "/admin/get/:hotelId",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelController.getOneHotels
);

export default router;
