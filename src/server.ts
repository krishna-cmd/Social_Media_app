import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {pool} from "./config/db";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import likeRoutes from "./routes/like.route";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes)


app.get("/", async(__, res) => {
    try{
    const result = await pool.query("SELECT NOW()");
    res.json({message : "Server running", time: result.rows[0]});
    } catch (err){
        console.log("FULL DB ERROR:", err);
        res.status(500).json({error: "Database connection failed"});
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})