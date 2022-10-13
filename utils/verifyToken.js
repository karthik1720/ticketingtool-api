import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(createError(400, "You are not authenticated!"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token invalid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) next();
    else return next(createError(403, "You are not authorized"));
  });
};
