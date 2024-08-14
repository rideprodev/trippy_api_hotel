import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validations from "../validations";

const { biddingController } = controllers;
const {
  authMiddleware,
  resourceAccessMiddleware,
  validateMiddleware,
  hotelMiddleware,
} = middlewares;
const { biddingValidator } = validations;

const router = Router();
// ------------ Backend Apis Start -----------------------

router.get(
  "/my-biddings",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  biddingController.getMyBiddings
);

router.get(
  "/my-biddings/:biddingId",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  biddingController.getAllBidding
);

router.get(
  "/admin/user",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelMiddleware.isUserExist,
  biddingController.getUserWiseBidding
);

router.get(
  "/admin/:biddingId",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  biddingController.getAllBidding
);

router.post(
  "/place-bid",
  authMiddleware,
  validateMiddleware({
    schema: biddingValidator.placeBid,
  }),
  // hotelMiddleware.checkBiddingExist,
  hotelMiddleware.checkBiddingPossible,
  hotelMiddleware.checkbookingRefundable,
  biddingController.placeMyBid
);

router.put(
  "/update-bid/:id",
  authMiddleware,
  validateMiddleware({
    schema: biddingValidator.updateBid,
  }),
  hotelMiddleware.isBiddingExist,
  biddingController.updateBidding
);

router.delete(
  "/cancel-bid/:id",
  authMiddleware,
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.isBiddingExist,
  (req, res, next) => {
    req.body.status = "cancelled";
    next();
  },
  biddingController.updateBidding
);

router.post(
  "/running-biddings-booking",
  authMiddleware,
  validateMiddleware({
    schema: biddingValidator.checkBookingForBidding,
  }),
  resourceAccessMiddleware(["user"]),
  hotelMiddleware.checkBiddingForSearch,
  hotelMiddleware.checkBookingForSearch,
  biddingController.bookingAvaliablity
);

export default router;
