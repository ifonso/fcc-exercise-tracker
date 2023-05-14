import express from "express";
import cors from "cors";
import routes from "./routes";
import connection from "./database/connection";
import errorHandler from "./error";

const _ = connection;
const PORT = process.env.PORT || 443;
const optioins: cors.CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(optioins));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen at: [${PORT}]`);
});
