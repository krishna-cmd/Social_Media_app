import { Request, Response } from "express";
import { likePostServie, unlikePostServie } from "../services/like.service";

interface AuthRequest extends Request{
    userId? : number;
}

export const likePost = async (req: AuthRequest, res: Response) => {

    try{ 
        await likePostServie(
            Number(req.params.postId),
            req.userId!
        )
        res.json({ message : "Post Liked"});
    } catch (error){
        console.log(error);
        res.status(500).json({message: " Failed to like the post"});
    }
};

export const unlikePost = async (req: AuthRequest, res: Response) => {

    try{
        await unlikePostServie(
            Number(req.params.postId),
            req.userId!
        )
        res.json({message : "Post UnLiked"});
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Failed to unlike the post"});
        
    }
};