import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";

import useStyles from "./styles.js";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Got a Sign In in if you want to remember your Memories. You will forget them if you Dont!
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>

        <TextField
          variant="outlined"
          name="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          label="Title"
        />
        <TextField
          variant="outlined"
          name="Message"
          fullWidth
          multiline
          minRows={5}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          label="Message"
        />
        <TextField
          variant="outlined"
          name="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          label="Tags"
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
