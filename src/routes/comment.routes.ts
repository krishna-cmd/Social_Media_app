import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addComment } from "../controllers/comment.controller";

const router = Router();

router.post("/:postId", authenticate, addComment);

export default router;