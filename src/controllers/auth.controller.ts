import {Request, Response} from "express";
import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    const {username, email, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,10);

        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
            [username, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : " Registration Failed"});
    }
};

export const login = async (req: Request, res: Response) => {
    const {email, password } = req.body;

    try{
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if( user.rows.length === 0){
            return res.status(400).json({ message : "User not found"});
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if(!validPassword){
            return res.status(400).json({ message : " Invalid Credentials" });
        }

        const token = jwt.sign(
            {userId: user.rows[0].id},
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}
        );

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Login Failed"})
    }
};