import { createPost } from "../controllers/post.controller";
import { createPostRepo, getPostRepo } from "../repositories/post.repository";

export const createPostService = async(
    userId: number,
    content : string
) => {
    if(!content || content.trim() === ""){
        throw new Error("Post content is required");
    }
    
    return await createPostRepo(userId, content);
};

export const getPostService = async(
    userId: number
) => {
    return await getPostRepo(userId);
}