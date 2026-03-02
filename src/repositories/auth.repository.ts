import { pool } from "../config/db";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const createUserRepo = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, hashedPassword]
  );

  return result.rows[0];
};