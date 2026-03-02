import { commentRepo } from "../repositories/comment.repository";

export const commentService = async(
    postId: number,
    content: string,
    userId: number
) => {
    try{ 
        if(!content){
            throw new Error("comment cannot be Empty")
        }
        await commentRepo(postId, content, userId)
    } catch(error){
        throw new Error("Failed to comment on the post")
    }
}