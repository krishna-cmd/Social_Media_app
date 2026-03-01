import { Router } from "express";
import { likePost, unlikePost } from "../controllers/like.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/:postId", authenticate,likePost);
router.delete("/:postId", authenticate, unlikePost);

export default router;