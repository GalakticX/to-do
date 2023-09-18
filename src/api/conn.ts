import { NextApiRequest, NextApiResponse } from "next";

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "to-do",
});

export default connection;
