import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import { db } from "./db.js";
import routes from "./routes.js";
const app = express();
app.use("/api", routes);
app.use(cookieParser());
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ======LISTEN========
app.listen(port, () => {
  console.log("server listening to " + port);
});
