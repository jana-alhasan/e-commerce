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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (requestError) {
      // authSlice exposes the user-facing login error below.
    }
  };

  return (
    <Grid container style={className.container} justifyContent="center">
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
        <Typography variant="body2" sx={{ mt: 1 }}>
          Demo account (DummyJSON test data): <strong>emilys</strong> /{" "}
          <strong>emilyspass</strong>
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
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
            error={Boolean(errors.username)}
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            error={Boolean(errors.password)}
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
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Grid>
    </Grid>
  );
};

export default Login;
