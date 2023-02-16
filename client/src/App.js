import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/navbar/NavBar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/auth/Auth.js";
import PostDetails from "./components/postDetails/PostDetails.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />}></Route>
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/search" element={<Home />}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
