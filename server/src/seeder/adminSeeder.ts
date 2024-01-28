import mongoConnect from "../database/mongo";
import admin from "../models/admin";
import bcrypt from "../utils/bcrypt";
import { config } from "dotenv";

config();

(async function () {
  const connection = await mongoConnect();
  switch (process.argv[2]) {
    case "up":
    case "UP":
      console.log(
        await admin.create({
          name: "Admin",
          email: "admin123@gmail.com",
          password: bcrypt.hash("Default@123"),
        })
      );
      break;
    case "down":
    case "DOWN":
      console.log(await admin.deleteOne({ email: "admin123@gmail.com" }));
      break;
    default:
      break;
  }
  await connection.disconnect();
  process.exit();
})();
