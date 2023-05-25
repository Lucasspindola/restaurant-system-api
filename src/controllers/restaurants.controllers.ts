import { Request, Response } from "express";
import createNewRestaurantService from "../services/RestaurantsServices/createNewRestaurant.services";
import listAllRestaurantsService from "../services/RestaurantsServices/listAllRestaurants.services";
import viewOfRestaurantByIdService from "../services/RestaurantsServices/viewOfRestaurantById.services";
const createNewRestaurantController = async (req: Request, res: Response) => {
  const dataRestaurant: any = req.body;

  const registerRestaurant = await createNewRestaurantService(dataRestaurant);
  return res.status(201).json(registerRestaurant);
};

const listAllRestaurantsController = async (req: Request, res: Response) => {
  const allRestaurants = await listAllRestaurantsService();
  return res.status(201).json(allRestaurants);
};

const viewOfRestaurantByIdController = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  const restaurant = await viewOfRestaurantByIdService(restaurantId);
  return res.status(201).json(restaurant);
};

export {
  createNewRestaurantController,
  listAllRestaurantsController,
  viewOfRestaurantByIdController,
};
