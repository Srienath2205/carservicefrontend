import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Box,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, Link } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

const defaultTheme = createTheme();

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateValues(email,password)) {
      try {
        const response = await axios.get(
          `http://localhost:8686/admin/login/${email}/${password}`
        );

        if (response.data) {
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("adminID", response.data.adminID);
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Redirecting to admin dashboard.",
            confirmButtonColor: "#1e3a8a",
            timer: 3000,
          }).then(() => {
            navigate("/admin-dashboard"); 
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "An error occurred while logging in. Please try again later.",
            confirmButtonColor: "#dc2626",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "An error occurred while logging in. Please try again later.",
        });
      }
    }
  };

  const validateValues = (email, password) => {
    let isValid = true;
    let errorMessage = "";

    // Validate Email
    if (!email) {
      errorMessage = "Please enter your email address.";
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      errorMessage = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate Password
    if (!password) {
      errorMessage = "Please enter your password.";
      isValid = false;
    } else if (password.length < 6) {
      errorMessage = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      errorMessage = "Password must include both letters and numbers.";
      isValid = false;
    }

    if (!isValid) {
      setError(errorMessage);
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HomeNavbar/>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://www.shutterstock.com/image-vector/cyber-security-software-abstract-concept-600nw-1870032859.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 3,
              padding: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "cornflowerblue" }}
            >
              Admin Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              {error && (
                <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                size="medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                size="medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.5 }}
              >
                Login
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link to="/admin-register" style={{ textDecoration: "none" }}>
                  <Button variant="text" color="primary">
                    Register
                  </Button>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
