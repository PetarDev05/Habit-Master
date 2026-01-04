import dotenv from "dotenv";
import { connectDB } from "./src/db/connect.db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE CONNECTION ERROR: ", error);
    process.exit(1);
  });
