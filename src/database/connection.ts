import mongoose from "mongoose";

const MONGO_URI =
    (process.env.CURRENT_ENV == "PRODUCTION"
        ? process.env.MONGO_URI
        : process.env.TESTE_URI) || "";

mongoose.set("strictQuery", false);
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => {
        console.log("Error while connecting to database.");
        console.error(err);
        process.exit(1);
    });

export default mongoose.connection;
