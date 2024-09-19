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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate, Link } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

const defaultTheme = createTheme();

export default function CustomerRegister() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateValues(inputData)) {
      try {
        const response = await axios.post(
          "http://localhost:8686/customer/add",
          inputData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Registered Successfully!",
            text: "Please check your email.",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            setInputData({
              name: "",
              email: "",
              password: "",
              phoneNumber: "",
              address: "",
            });
            navigate("/customer-login");
          });
        } else if (response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: response.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Error",
            text: "An unexpected error occurred. Please try again later.",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: err.response?.data || "An error occurred while registering. Please try again later.",
        });
      }
    }
  };
  

  const validateValues = (inputData) => {
    const { name, email, password, phoneNumber, address } = inputData;
    let isValid = true;
    let errorMessage = "";

    // Name Validation
    if (!name) {
      errorMessage = "Please enter your name.";
      isValid = false;
    } else if (name.length <= 6) {
      errorMessage = "Name must be more than 6 characters long.";
      isValid = false;
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(name)) {
      errorMessage = "Name must include both letters and numbers.";
      isValid = false;
    }

    // Email Validation
    if (!email) {
      errorMessage = "Please enter your email.";
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      errorMessage = "Please enter a valid email address.";
      isValid = false;
    }

    // Password Validation
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

    // Contact Number Validation
    if (!phoneNumber) {
      errorMessage = "Please enter your phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errorMessage = "Contact number must be 10 digits long.";
      isValid = false;
    }

    // Address Validation (if necessary)
    if (!address) {
      errorMessage = "Please enter your address.";
      isValid = false;
    }

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: errorMessage,
      });
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HomeNavbar />
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://static.vecteezy.com/system/resources/previews/009/384/051/non_2x/car-dealership-seller-greeting-customer-vector.jpg")',
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
              <PersonAddIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "cornflowerblue" }}
            >
              Register Your Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                variant="outlined"
                size="medium"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                size="medium"
                value={inputData.email}
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
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
                value={inputData.password}
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="text"
                id="phoneNumber"
                autoComplete="phone"
                variant="outlined"
                size="medium"
                value={inputData.phoneNumber}
                onChange={(e) =>
                  setInputData({ ...inputData, phoneNumber: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                autoComplete="address"
                variant="outlined"
                size="medium"
                value={inputData.address}
                onChange={(e) =>
                  setInputData({ ...inputData, address: e.target.value })
                }
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.5 }}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link to="/customer-login" style={{ textDecoration: "none" }}>
                  <Button variant="text" color="primary">
                    Sign In
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
