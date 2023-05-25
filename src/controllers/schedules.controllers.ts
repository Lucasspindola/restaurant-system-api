import { Request, Response } from "express";
import createNewSchedulesService from "../services/SchedulesServices/createNewSchedules.services";
import deleteSchedulesService from "../services/SchedulesServices/deleteSchedules.services";
import updatedSchedulesService from "../services/SchedulesServices/updatedSchedules.services";
import isOpenService from "../services/SchedulesServices/isOpen.services";

const createNewSchedulesController = async (req: Request, res: Response) => {
  const dataSchedules: any = req.body;
  const restaurantId = req.user.id;

  const newSchedule = await createNewSchedulesService(
    dataSchedules,
    restaurantId
  );
  return res.status(201).json(newSchedule);
};

const deleteSchedulesController = async (req: Request, res: Response) => {
  const dayWeekId: string = req.params.dayWeekId;
  const openingTimeId: string = req.params.openingTimeId;

  const newSchedule = await deleteSchedulesService(dayWeekId, openingTimeId);
  return res.status(200).json(newSchedule);
};

const updatedSchedulesController = async (req: Request, res: Response) => {
  const dataUpdatedSchedule = req.body;
  const idSchedules = req.params.idSchedules;
  const updatedSchedule = await updatedSchedulesService(
    dataUpdatedSchedule,
    idSchedules
  );
  return res.status(200).json(updatedSchedule);
};

const isOpenController = async (req: Request, res: Response) => {
  const data = req.body;
  const responseIsOpen = await isOpenService(data);
  return res.status(200).json(responseIsOpen);
};

export {
  createNewSchedulesController,
  deleteSchedulesController,
  updatedSchedulesController,
  isOpenController,
};
