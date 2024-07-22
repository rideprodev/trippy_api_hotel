import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const { bookingController } = controllers;
const { authMiddleware, resourceAccessMiddleware, hotelMiddleware } =
  middlewares;

const router = Router();
// ------------ Backend Apis Start -----------------------

router.get(
  "/mybooking",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  bookingController.getAllUserWiseBooking
);

router.get(
  "/mybooking/:bookingId",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.isbookingExist,
  bookingController.getOneUserWiseBooking
);

router.get(
  "/admin",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  bookingController.getAllBooking
);

router.get(
  "/admin/user",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  bookingController.getAllAdminUserWiseBooking
);

router.get(
  "/admin/:bookingId",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelMiddleware.isbookingExist,
  bookingController.getOneBooking
);

router.post(
  "/payment/:bookingId",
  authMiddleware,
  hotelMiddleware.isbookingExist,
  hotelMiddleware.isbookingCancelled,
  bookingController.payNow
);

export default router;
