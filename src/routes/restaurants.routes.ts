import { Router } from "express";
import {
  createNewRestaurantController,
  listAllRestaurantsController,
  viewOfRestaurantByIdController,
} from "../controllers/restaurants.controllers";
import dataVerificationByYupMiddlewares from "../middlewares/dataVerificationByYup.middlewares";
import { newRestaurantRequestSerializer } from "../serializers/restaurant.serializer";

const restaurantRoutes = Router();

restaurantRoutes.post(
  "",
  dataVerificationByYupMiddlewares(newRestaurantRequestSerializer),
  createNewRestaurantController
);
restaurantRoutes.get(
  "",

  listAllRestaurantsController
);
restaurantRoutes.get("/:id", viewOfRestaurantByIdController);

export default restaurantRoutes;
