import { NextApiRequest, NextApiResponse } from "next";

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "to-do",
});

async function getTasksFromDatabase(userId) {
  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  const values = [userId];

  connection.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
  });
}

getTasksFromDatabase(1);
