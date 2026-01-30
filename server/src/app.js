import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRouter from "./modules/authentication/routes/user.routes.js";
import dataRouter from "./modules/data/routes/data.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";
import { registerListeners } from "./events/registerListeners.events.js";

export const app = express();

registerListeners();

app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "http://localhost:5173" || "http://localhost:5174",
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`REQUEST METHOD: ${req.method}\nREQUEST PATH: ${req.path}`);
  next();
});

app.use("/api/user", userRouter);
app.use("/api/data", dataRouter);

app.use(errorHandler);
