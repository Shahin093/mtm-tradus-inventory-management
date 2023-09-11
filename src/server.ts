import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
const port = 5000;
async function database() {
  // KlEBSzp9rRSACq79
  //mtm-tradus-database
  try {
    await mongoose.connect(config.database_url as string);
    console.log(" Database is Connected Successfully");
    app.listen(port, () => {
      console.log(`App Listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database.`, error);
  }
}
database();
