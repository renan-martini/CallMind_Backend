import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
appRoutes(app);
app.use(errorMiddleware);

export default app;
