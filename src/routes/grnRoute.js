import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validations from "../validations";

const { grnController } = controllers;
const { authMiddleware, validateMiddleware, hotelMiddleware, cacheMiddleware } =
  middlewares;
const { grnValidator } = validations;

const router = Router();
// ------------ Backend Apis Start -----------------------
// full search
router.post(
  "/search/v2",
  cacheMiddleware.cacheMiddleware,
  validateMiddleware({
    schema: grnValidator.search,
  }),
  hotelMiddleware.fetchHotelsCodes,
  grnController.search
);

// short search
router.post(
  "/search/v1",
  cacheMiddleware.cacheMiddleware,
  validateMiddleware({
    schema: grnValidator.search,
  }),
  hotelMiddleware.checkApiProcessable,
  grnController.search
);

router.post(
  "/refetch",
  validateMiddleware({
    schema: grnValidator.refetch,
  }),
  grnController.refetch
);

router.post(
  "/revalidate",
  authMiddleware,
  validateMiddleware({
    schema: grnValidator.revalidate,
  }),
  grnController.revalidate
);

router.post(
  "/booking",
  authMiddleware,
  validateMiddleware({
    schema: grnValidator.booking,
  }),
  hotelMiddleware.checkUserRelevance,
  hotelMiddleware.checkCardExist,
  grnController.booking
);

router.get(
  "/booking-status/:bookingId",
  authMiddleware,
  hotelMiddleware.isbookingExist,
  grnController.bookingStatus
);

router.delete(
  "/booking-cancel/:bookingId",
  authMiddleware,
  hotelMiddleware.isbookingExist,
  hotelMiddleware.isbookingCancelled,
  grnController.bookingCancel
);

export default router;
