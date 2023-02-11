import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts-controller.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);
postsRouter.patch("/:id", updatePost);
postsRouter.delete("/:id", deletePost);
postsRouter.patch("/:id/likePost", likePost);

export default postsRouter;
