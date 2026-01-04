import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
app.use((req, res) => {
  console.log(`REQUEST METHOD: ${req.method}\nREQUEST PATH: ${req.path}`);
});
