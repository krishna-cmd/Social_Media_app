import { Request, Response } from "express";
import { pool } from "../config/db";

interface AuthRequest extends Request{
    userId?: number;
}

export const addComment = async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.postId);
    const { content } = req.body;
    const userId = req.userId;


  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Comment content is required" });
  }

    try {
        const result = await pool.query(
            `INSERT INTO comments (post_id, user_id, content) VALUES
            ($1, $2, $3)
            RETURNING *`,
            [postId,userId, content]
        );

        res.status(201).json(result.rows[0]);
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Failed to add comment"})
    }
};