import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createNewRestaurantService from "../services/RestaurantsServices/createNewRestaurant.services";
import listAllRestaurantsService from "../services/RestaurantsServices/listAllRestaurants.services";

const createNewRestaurantController = async (req: Request, res: Response) => {
  const dataRestaurant: any = req.body;

  const registerRestaurant = await createNewRestaurantService(dataRestaurant);
  return res.status(201).json(registerRestaurant);
};

const listAllRestaurantsController = async (req: Request, res: Response) => {
  const allRestaurants = await listAllRestaurantsService();
  return res.status(201).json(allRestaurants);
};
export { createNewRestaurantController, listAllRestaurantsController };
