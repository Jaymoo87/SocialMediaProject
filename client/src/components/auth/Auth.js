import React, { useState, useEffect } from "react";

import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { HiOutlineLockClosed } from "react-icons/hi";

import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

import Icon from "./icon";
import Input from "./Input";
import useStyles from "./styles";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, nav("/")));
    } else {
      dispatch(signin(formData, nav("/")));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "6680619751-igpm64dppt9sloem1qm9dbflue6ae08l.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In failed!");
  };

  const switchMode = (e) => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <HiOutlineLockClosed />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  autoComplete="name"
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                <Input
                  autoComplete="name"
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
              </>
            )}
            <Input autoComplete="email" name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              autoComplete="current-password"
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            {isSignUp && (
              <Input
                autoComplete="current-password"
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleShowPassword}
                type="password"
              />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="6680619751-igpm64dppt9sloem1qm9dbflue6ae08l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                color="primary"
                className={classes.googleButton}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "Already have and account? Sign in" : "Don't have an account? Sign up!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
