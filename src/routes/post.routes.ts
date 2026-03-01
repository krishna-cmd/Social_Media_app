import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// console.log("authenticate:", authenticate);
// console.log("createPost:", createPost);

router.post("/", authenticate, createPost);
router.get("/", getPosts)

export default router;