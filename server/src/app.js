import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

export const app = express();

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

// app.use("/api/users", userRouter);
// app.use("/api/weeks", weekRouter);

// app.use(errorHandler);
