import React, { useState } from "react";

import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";

import Input from "./Input";
import useStyles from "./styles";

// const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  //   const [isSignUp, setIsSignUp] = useState(false);

  const isSignUp = false;
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container component="main" masWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
