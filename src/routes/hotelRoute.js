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

router.post(
  "/search",
  validateMiddleware({
    schema: hotelValidator.search,
  }),
  hotelMiddleware.fetchHotelsCodes,
  hotelController.search
);

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
