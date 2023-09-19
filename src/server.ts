import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
// KlEBSzp9rRSACq79
//mtm-tradus-database
let server: Server;
async function database() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(" Database is Connected Successfully");
    server = app.listen(config.port, () => {
      console.log(`App Listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Falled to connect database.`, error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
database();

process.on("SIGTERM", () => {
  console.log("SIGTERM is receive");
  if (server) {
    server.close();
  }
});
