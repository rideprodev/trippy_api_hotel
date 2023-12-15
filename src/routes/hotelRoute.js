import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validations from "../validations";

const { hotelController } = controllers;
const {
  authMiddleware,
  resourceAccessMiddleware,
  validateMiddleware,
  hotelMiddleware,
} = middlewares;
const { hotelValidator } = validations;

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

router.get(
  "/admin/bidding/:biddingId",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelController.getAllBidding
);

router.get(
  "/admin/user/bidding",
  authMiddleware,
  resourceAccessMiddleware(["admin"]),
  hotelMiddleware.isUserExist,
  hotelController.getUserWiseBidding
);

// ------------Backend Apis End -----------------------
// ===========================================================
// ----------- Third Party Apis Start -----------------------

router.post(
  "/search",
  validateMiddleware({
    schema: hotelValidator.search,
  }),
  hotelMiddleware.fetchHotelsCodes,
  hotelController.search
);

router.get("/search/:serchId", hotelController.refetch);

router.post(
  "/revalidate",
  validateMiddleware({
    schema: hotelValidator.revalidate,
  }),
  hotelController.revalidate
);

router.post(
  "/booking",
  authMiddleware,
  validateMiddleware({
    schema: hotelValidator.booking,
  }),
  hotelMiddleware.checkMemberExist,
  hotelController.booking
);

router.post(
  "/place-bid",
  authMiddleware,
  validateMiddleware({
    schema: hotelValidator.placeBid,
  }),
  hotelController.placeMyBid
);

router.put(
  "/update-bid/:id",
  authMiddleware,
  validateMiddleware({
    schema: hotelValidator.updateBid,
  }),
  hotelMiddleware.isBiddingExist,
  hotelController.updateBidding
);

// ----------- Third Party Apis End -----------------------

export default router;
