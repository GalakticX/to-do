import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connection from "./conn";

const register = () => {
  async function checkIfUserExists(req: Request, res: Response) {
    const username = "test"; //change this to the actual username from the form
    const sql = "SELECT * FROM users WHERE username = ?";
    const values = [username];
  }
};
