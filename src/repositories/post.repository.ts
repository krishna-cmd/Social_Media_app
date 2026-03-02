import { pool } from "../config/db";

export const createPostRepo = async(
    userId : number,
    content: string
) => {
    const result  = await pool.query(
        "INSERT INTO posts ( user_id, content) VALUES ($1, $2) RETURNING *",[userId, content]);

        return result.rows[0];
};

export const getPostRepo = async(
    userId :number
) => {
     const result = await pool.query(
        `SELECT 
        posts.id,
        posts.content,
        posts.created_at,
        users.username,
        COUNT(DISTINCT likes.id) AS like_count,
        COUNT(DISTINCT comments.id) AS comment_count,
        CASE 
          WHEN COUNT(DISTINCT user_likes.id) > 0 THEN true
          ELSE false
        END AS is_liked
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN likes ON posts.id = likes.post_id
      LEFT JOIN comments ON posts.id = comments.post_id
      LEFT JOIN likes AS user_likes 
        ON posts.id = user_likes.post_id 
        AND user_likes.user_id = $1
      GROUP BY posts.id, users.username
      ORDER BY posts.created_at DESC
        `,[userId]);

    return result.rows;
};