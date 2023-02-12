import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/navbar/NavBar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" exace component={Home}></Route>
          <Route path="/auth" exace component={Auth}></Route>
        </Switch>
        <Home />
      </Container>
    </BrowserRouter>
  );
};

export default App;
