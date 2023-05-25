import { Router } from "express";

import dataVerificationByYupMiddlewares from "../middlewares/dataVerificationByYup.middlewares";
import validityCheckOfUserByTokenMiddlewares from "../middlewares/validityCheckOfUserByToken.middlewares";
import {
  createNewSchedulesController,
  deleteSchedulesController,
  isOpenController,
  updatedSchedulesController,
} from "../controllers/schedules.controllers";
import {
  isOpenSchedule,
  newScheduleSerializer,
  updatedSchedule,
} from "../serializers/schedules.serializers";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  dataVerificationByYupMiddlewares(newScheduleSerializer),
  validityCheckOfUserByTokenMiddlewares,
  createNewSchedulesController
);

schedulesRoutes.patch(
  "/:idSchedules",
  dataVerificationByYupMiddlewares(updatedSchedule),
  validityCheckOfUserByTokenMiddlewares,
  updatedSchedulesController
);

schedulesRoutes.get(
  "/",
  dataVerificationByYupMiddlewares(isOpenSchedule),
  isOpenController
);
schedulesRoutes.delete(
  "/:dayWeekId/:openingTimeId",
  validityCheckOfUserByTokenMiddlewares,
  deleteSchedulesController
);

export default schedulesRoutes;
