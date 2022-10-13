import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.mysqlHOST,
  user: process.env.mySQLUSER,
  password: process.env.mySQLPASS,
  database: process.env.mySQLDB,
});

db.connect();
db.query("SELECT 1 + 1 AS RESULT", (err, result, fields) => {
  if (err) {
    throw err;
  }
  console.log("Db connected");
});
