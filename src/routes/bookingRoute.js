import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validations from "../validations";

const { grnValidator } = validations;
const { bookingController } = controllers;
const {
  authMiddleware,
  resourceAccessMiddleware,
  validateMiddleware,
  hotelMiddleware,
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
  hotelMiddleware.isbookingExistUserWise,
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
  validateMiddleware({
    schema: grnValidator.payment,
  }),
  hotelMiddleware.isbookingExist,
  hotelMiddleware.isbookingCancelled,
  bookingController.payNow
);

router.put(
  "/update-card/:bookingId",
  authMiddleware,
  validateMiddleware({
    schema: grnValidator.updateCardOnBooking,
  }),
  hotelMiddleware.isbookingExist,
  hotelMiddleware.isbookingCancelled,
  hotelMiddleware.isCardExist,
  bookingController.updateCardOnBooking
);

router.get(
  "/check-bidding-latest-price/:bookingId",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.isbookingExist,
  bookingController.fetchLatestPrice
);

router.put(
  "/acceptOrReject/:bookingId",
  authMiddleware,
  validateMiddleware({
    schema: grnValidator.aceptOrRejectBooking,
  }),
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.isbookingExist,
  hotelMiddleware.isbookingForAcceptExist,
  bookingController.aceptOrRejectBooking
);

export default router;
