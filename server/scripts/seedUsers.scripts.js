import { connectDatabase, disconnectDatabase } from "./utils/db.utils.js";
import { registerUser } from "../src/services/registration.services.js";

const users = [
  {
    username: "Peki",
    email: "peki@gmail.com",
    password: "!Peki123",
  },
  {
    username: "Miki",
    email: "miki@gmail.com",
    password: "!Miki123",
  },
];

const createUsers = async () => {
  try {
    await connectDatabase();

    for (const user of users) {
      await registerUser(user.username, user.email, user.password);
      console.log("USER CREATED: ", user.username);
    }
  } catch (error) {
    console.log("SEEDING FAILED: ", error);
  } finally {
    await disconnectDatabase();
  }
};

createUsers();
