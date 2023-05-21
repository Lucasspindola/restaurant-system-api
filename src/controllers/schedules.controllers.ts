import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import createNewSchedulesService from "../services/SchedulesServices/createNewSchedules.services";

const createNewSchedulesController = async (req: Request, res: Response) => {
  const dataSchedules: any = req.body;
  const restaurantId = req.user.id;

  const newSchedule = await createNewSchedulesService(
    dataSchedules,
    restaurantId
  );
  return res.status(201).json(newSchedule);
};
export { createNewSchedulesController };
