import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

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

  try {
    const result = await connection.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error("Error querying the database", error);
  }
}

export default async (req: NextRequest) => {
  if (req.method === "GET") {
    const { username } = req.body.json();
    const getTasks = await getTasksFromDatabase(username);
    if (!getTasks) {
      return new NextResponse(
        JSON.stringify({ message: "No tasks found for user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new NextResponse(JSON.stringify({ getTasks }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  return new NextResponse(null, { status: 405 });
};
