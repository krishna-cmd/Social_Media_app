import { Request, Response } from "express";
import { createPostService, getPostService } from "../services/post.service";
import { getPostRepo } from "../repositories/post.repository";

interface AuthRequest extends Request {
  userId?: number;
}

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await createPostService(req.userId!, req.body.content);

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create a post" });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const getpost = await getPostService(req.userId!);
    res.json(getpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch the posts." });
  }
};
