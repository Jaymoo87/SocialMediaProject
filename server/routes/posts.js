import express from "express";
import { getPosts, createPost } from "../controllers/posts-controller.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);

export default postsRouter;
