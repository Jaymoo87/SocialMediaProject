import React, { useEffect, useState } from "react";

import { Container, Grow, Grid, Paper, AppBar, Button, OutlinedInput, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";

import Pagination from "../Pagination";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
    }
  };

  const searchPost = () => {
    if (!search.trim()) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
    } else {
      nav("/");
    }
  };

  const handleAddTAG = (tag) => setTags([...tags, tag]);
  const handleDeleteTAG = (TAGToDelete) => setTags(tags.filter((tag) => tag !== TAGToDelete));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} m={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} m={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                type="search"
                variant="outlined"
                label="Search Memories"
                // onKeyDown={handleKeyDown}
                fullWidth
                value="TEST"
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                type="search"
                style={{ margin: "10px 0" }}
                value={tags}
                // onAdd={(tag) => handleAddTAG(tag)}
                // onDelete={(tag) => handleDeleteTAG(tag)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary">
                {" "}
                Search{" "}
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
