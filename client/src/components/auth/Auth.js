import React, { useState } from "react";

import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { HiOutlineLockClosed } from "react-icons/hi";

import { GoogleLogin } from "react-google-login";

import Icon from "./icon";
import Input from "./Input";
import useStyles from "./styles";

// const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword(!showPassword);

  const googleSuccess = async (res) => {
    console.log(res);
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In failed!");
  };

  const switchMode = (e) => {
    e.preventDefault();
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
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6} />
                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus xs={6} />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            {isSignUp && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleShowPassword} type="password" />
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
            cookiePolicy="singlt_host_"
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
