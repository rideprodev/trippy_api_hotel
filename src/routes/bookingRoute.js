import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validations from "../validations";

const { bookingController } = controllers;
const { biddingValidator } = validations;
const {
  authMiddleware,
  resourceAccessMiddleware,
  hotelMiddleware,
  validateMiddleware,
} = middlewares;

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
  "/booking-availiablity",
  authMiddleware,
  validateMiddleware({
    schema: biddingValidator.checkBookingForBidding,
  }),
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.checkBookingForBidding,
  bookingController.bookingAvaliablity
);

export default router;
