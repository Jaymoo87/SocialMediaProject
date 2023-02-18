import React from "react";

import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./post/Post";
import useStyles from "./styles.js";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state.posts);

  console.log(posts);
  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
