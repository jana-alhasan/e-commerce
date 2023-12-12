// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material";
import { loginUser, selectError, selectUser } from "../../redux/authSlice";
import { className } from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    username: "mor_2314",
    password: "83r5^_",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password.trim())) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    dispatch(loginUser(formData))
    .unwrap()
    .then(() => {
      if (user) {
        console.log('Successful login');
        navigate('/');
      } else {
        console.log('Unsuccessful login');
      }
    })
    .catch((error) => {
      console.log('Unsuccessful login', error);
    });
  }

  return (
    <Grid container style={className.container} justifyContent={"center"}>
      <Grid
        item
        md={6}
        display={{ xs: "none", md: "flex" }}
        style={className.circle}
      >
        <Typography
          right={{ md: "4%", lg: "5%", xl: "8%" }}
          fontSize={{ md: "12px", lg: "1rem" }}
          style={className.welcome}
        >
          Welcome
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} style={className.loginBox}>
        <Typography component="h1" variant="h5" style={className.Font}>
          Login to your account
        </Typography>
        <form style={className.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={className.submit}
          >
            Login
          </Button>
        </form>
        <FormHelperText>{error}</FormHelperText>
      </Grid>
    </Grid>
  );
};

export default Login;
