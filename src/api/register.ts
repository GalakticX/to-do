import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connection from "./conn";

async function checkIfUsernameExists(username) {
  const sql = "SELECT * FROM users WHERE username = ?";
  const values = username;

  try {
    const result = await connection.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error("Error querying  the database", error);
    throw error;
  }
}

export default async (req: NextRequest) => {
  if (req.method === "POST") {
    const { username, password } = await req.body.json();

    const userExists = await checkIfUsernameExists(username);

    if (userExists) {
      return new NextResponse(
        JSON.stringify({ message: "User with that username already exists" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const values = [username, hashedPassword];

    return new NextResponse(
      JSON.stringify({ message: "User successfully created" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }

  return new NextResponse(null, { status: 405 });
};
