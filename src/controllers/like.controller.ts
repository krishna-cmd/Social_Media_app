import { Request, Response } from "express";
import { pool } from "../config/db";

interface AuthRequest extends Request{
    userId? : number;
}

export const likePost = async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.postId);
    const userId = req.userId;

    try{ 
        await pool.query(
            "INSERT INTO likes (post_Id, user_Id) VALUES ($1, $2)",[postId, userId]
        );
        res.json({ message : "Post Liked"});
    } catch (error){
        if((error as any).code === "23505"){
            return res.status(400).json({message : "Already Liked"});
        }
        console.log(error);
        res.status(500).json({message: " Failed to like the post"});
    }
};

export const unlikePost = async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId;
    const userId = req.userId;

    try{
        await pool.query(
            "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
            [postId, userId]
        );
        res.json({message : "Post UnLiked"});
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Failed to unlike the post"});
        
    }
};