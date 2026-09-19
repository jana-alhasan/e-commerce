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
import { loginUser, selectError } from "../../redux/authSlice";
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

    const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    dispatch(loginUser(formData))
    .unwrap()
    .then(() => {
      
        navigate('/');
      
    })
     .catch(() => {
        // authSlice already stores a user-facing message in `error`,
        // shown below via <FormHelperText>{error}</FormHelperText>
      });
  };

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
        <form style={className.form} onSubmit={handleSubmit} noValidate>
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
