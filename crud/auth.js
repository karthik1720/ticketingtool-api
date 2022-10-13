import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { username, email, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        console.log(hash);
        const q = `insert into USER values ('${username}','${email}','${hash}')`;
        db.query(q, (err, result) => {
          if (err) console.log(err);
          res.send(result);
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("called");
    const { username, password } = req.body;
    const sql = `select USERNAME, PASSWORD from USER where USERNAME = '${username}'`;
    db.query(sql, async (err, result) => {
      if (err) {
        console.log(err);
        next(err);
      }
      console.log(result);
      if (!result[0]) {
        res.send("No user found");
      } else {
        const hashedPass = result[0].PASSWORD;
        console.log(hashedPass);
        console.log(password);

        const isCorrect = bcrypt.compareSync(password, hashedPass);
        console.log(isCorrect);
        if (isCorrect) {
          const token = jwt.sign(
            { username: req.body.username },
            process.env.JWT,
            {
              expiresIn: "1h",
            }
          );

          res
            .cookie("token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(token);
        } else {
          return next(createError(400, "wrong info"));
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
