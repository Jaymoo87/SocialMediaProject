import React, { useEffect, useState } from "react";

import { Container, Grow, Grid, Paper, AppBar, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/posts";
import { useLocation, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

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
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
    }
  };

  const searchPost = () => {
    if (!search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")} `);
    } else {
      history.push("/");
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
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                type="search"
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddTAG(chip)}
                onDelete={(chip) => handleDeleteTAG(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">
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
