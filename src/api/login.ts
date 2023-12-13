import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connection from "./conn";
import { stat } from "fs";

const getUserByUsername = async (username) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  const values = [username];
  try {
    const response = await connection.query(sql, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export default async (req: NextRequest) => {
  if (req.method === "POST") {
    const { username, password } = req.body.json();
    const user = await getUserByUsername(username);
    if (user) {
      const hashedPassword = user.password;
      const validatePassword = await bcrypt.compare(password, hashedPassword);
      if (!validatePassword) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid password" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      } else {
        localStorage.setItem("username", username);
        return new NextResponse(JSON.stringify({ message: "Authorized" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  }
  return new NextResponse(null, { status: 405 });
};
