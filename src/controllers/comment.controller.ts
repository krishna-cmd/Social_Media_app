import { Request, Response } from "express";
import { commentService } from "../services/comment.service";

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
        const result = await commentService(postId, content, userId!);
        res.status(201).json({ message: "Comment added successfully", data: result });
    } catch (error) {
        console.error("Failed to add comment:", error);
        res.status(500).json({ message: "Failed to comment on the post" });
    }
};