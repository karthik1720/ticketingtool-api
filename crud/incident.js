import { db } from "../db.js";

export const createIncident = (req, res, next) => {
  try {
    const userid = 1;
    const { title, description, priority } = req.body;
    console.log(title, description, priority);
    let sla;
    let type;
    switch (parseInt(priority)) {
      case 1:
        sla = 4;
        type = "HOUR";
        break;
      case 2:
        sla = 1;
        type = "DAY";
        break;
      case 3:
        sla = 3;
        type = "DAY";
        break;
      case 4:
        sla = 5;
        type = "DAY";
        break;
      default:
        sla = 1;
        break;
    }
    const q = `insert into INCIDENT ( TITLE, DESCRIPTION, PRIORITY, ENDS_ON) values ('${title}', '${description}', '${priority}', DATE_ADD(CURRENT_TIMESTAMP, interval ${sla} ${type} ))`;
    db.query(q, (err, result) => {
      console.log(result);
      res.send(result);
    });
  } catch (error) {}
};

export const viewIncident = (req, res, next) => {
  try {
    const { title, description } = req.body;
    const q = `SELECT * FROM INCIDENT`;
    db.query(q, (err, result) => {
      res.send(result);
    });
  } catch (error) {}
};

export const updateIncident = (req, res, next) => {
  try {
    const { journal, number } = req.body;
    const q = `insert into JOURNAL (COMMENT, BY, ID) VALUES ()`;
  } catch {}
};
