import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
} from "../controllers/posts-controller.js";
import authCheck from "../middleware/auth.mw.js";

const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/search", getPostBySearch);

postsRouter.post("/", authCheck, createPost);
postsRouter.patch("/:id", authCheck, updatePost);
postsRouter.delete("/:id", authCheck, deletePost);

postsRouter.patch("/:id/likePost", authCheck, likePost);

export default postsRouter;
