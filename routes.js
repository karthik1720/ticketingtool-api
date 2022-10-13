import cookieParser from "cookie-parser";
import express, { Router } from "express";

import {
  deleteUser,
  loginUser,
  logoutUser,
  refreshtoken,
  verify,
} from "./crud/authentication.js";
import { createIncident, viewIncident } from "./crud/incident.js";

const router = Router();
router.use(express.json());
router.use(cookieParser());
router.get("/check", (req, res) => {
  res.send("Hello");
});

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// -------Auth--------
// router.post("/auth/register", register);
// router.post("/auth/login", login);

// -------Incident--------
router.post("/incident/create", createIncident);
router.get("/incident/view", viewIncident);

//Authentication
router.delete("/auth/users/:userId", verify, deleteUser);
router.post("/auth/logout", verify, logoutUser);
router.post("/auth/login", loginUser);
router.post("/auth/refresh", refreshtoken);

export default router;
