import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import restaurantRoutes from "./routes/restaurants.routes";
import schedulesRoutes from "./routes/schedules.routes";
import sessionRoutes from "./routes/session.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/restaurants", restaurantRoutes);
app.use("/schedules", schedulesRoutes);
app.use("/session", sessionRoutes);
app.use(handleError);
export default app;
