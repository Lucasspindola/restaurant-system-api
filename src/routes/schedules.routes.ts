import { Router } from "express";

import dataVerificationByYupMiddlewares from "../middlewares/dataVerificationByYup.middlewares";
import validityCheckOfUserByTokenMiddlewares from "../middlewares/validityCheckOfUserByToken.middlewares";
import { createNewSchedulesController } from "../controllers/schedules.controllers";
import { newScheduleSerializer } from "../serializers/schedules.serializers";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  dataVerificationByYupMiddlewares(newScheduleSerializer),
  validityCheckOfUserByTokenMiddlewares,
  createNewSchedulesController
);

export default schedulesRoutes;
