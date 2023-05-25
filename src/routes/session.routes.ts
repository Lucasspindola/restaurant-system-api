import { Router } from "express";
import { loginSessionController } from "../controllers/loginSession.controllers";
import dataVerificationByYupMiddlewares from "../middlewares/dataVerificationByYup.middlewares";
import { newSessionSerializer } from "../serializers/newSession.serializers";

const sessionRoutes = Router();
sessionRoutes.post(
  "",
  dataVerificationByYupMiddlewares(newSessionSerializer),
  loginSessionController
);
export default sessionRoutes;
