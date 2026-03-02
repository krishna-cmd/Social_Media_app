import {pool} from "../config/db";

export const commentRepo = async(
    postId: number,
    content: string,
    userId: number
) => {
    return pool.query(
        `INSERT INTO comments (post_id, user_id, content) VALUES
            ($1, $2, $3)
            RETURNING *`,
            [postId,userId, content]
    )
};