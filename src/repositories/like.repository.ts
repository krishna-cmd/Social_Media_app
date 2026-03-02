import {pool} from "../config/db";

export const likePostRepo = async(
    postId: number,
    userId: number
) => {
    return pool.query(
        "INSERT INTO likes (post_Id, user_Id) VALUES ($1, $2)",
        [postId, userId]);
};

export const unlikePostRepo = async(
    postId: number,
    userId: number
)=> {
    return pool.query(
        "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
            [postId, userId]
    );
}