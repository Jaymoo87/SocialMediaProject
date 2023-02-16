import React from "react";

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/navbar/NavBar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={() => <Redirect to="/posts" />}></Route>
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/search" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
