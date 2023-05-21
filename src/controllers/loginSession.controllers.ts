import { Request, Response } from "express";

import { IRestaurantLogin } from "../interfaces/restaurants";
import loginSessionService from "../services/SessionServices/loginSession.services";

const loginSessionController = async (req: Request, res: Response) => {
  const dataSession: IRestaurantLogin = req.body;
  const token = await loginSessionService(dataSession);
  return res.status(200).json({ token });
};

export { loginSessionController };
