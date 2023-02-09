import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts-controller.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);
postsRouter.patch("/:id", updatePost);

export default postsRouter;
