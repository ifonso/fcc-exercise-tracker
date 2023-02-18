import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect((process.env.CURRENT_ENV == "PRODUCTION" ? process.env.MONGO_URI : process.env.TESTE_URI) || "")
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Error while connecting to database.");
    console.error(err);
    process.exit(1);
  });

export default mongoose.connection;
