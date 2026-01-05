import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import errorHandler from "./src/middlewares/errorHandler.middlewares.js";

export const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    origin: "*",
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`REQUEST METHOD: ${req.method}\nREQUEST PATH: ${req.path}`);
  next();
});

app.use("/api/users", userRouter);

app.use(errorHandler);
