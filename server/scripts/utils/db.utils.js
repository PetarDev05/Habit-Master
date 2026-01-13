import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
