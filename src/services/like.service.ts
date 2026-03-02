import { likePostRepo, unlikePostRepo } from "../repositories/like.repository";

export const likePostServie = async(
    postId: number,
    userId: number
) => {
    try{
        await likePostRepo(postId, userId);
    } catch (error){
        if((error as any).code=== "23505"){
            throw new Error("already Liked");
        }
        throw error;
    }
}

export const unlikePostServie = async(
    postId: number,
    userId: number
) => {
    await unlikePostRepo(postId, userId)
};