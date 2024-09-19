import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import {
  Event,
  AccessTime,
  Person,
  Close,
  Business,
  Build,
} from "@mui/icons-material";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const serviceTypes = [
  "Routine",
  "Repairs",
  "Cleaning",
  "Inspections",
  "Specialized",
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    serviceCenterID: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
    appointmentStatus: "Pending",
  });
  const [formErrors, setFormErrors] = useState({});
  const [customers, setCustomers] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [customerUsername, setCustomerUsername] = useState("");
  const [selectedCenterName, setSelectedCenterName] = useState("");
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8686/customer/all");
        setCustomers(response.data);
        const sessionCustomerID = sessionStorage.getItem("customerID");

        if (sessionCustomerID) {
          setFormData((prevData) => ({
            ...prevData,
            customerID: sessionCustomerID,
          }));
          const customer = response.data.find(
            (cust) => cust.customerID === parseInt(sessionCustomerID)
          );
          if (customer) {
            setCustomerUsername(customer.name);
          } else {
            setError("Customer not found.");
          }
        } else {
          setError("Customer ID is missing in session storage.");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Error fetching customer data.");
        Swal.fire({
          icon: "error",
          title: "Data Fetch Error",
          text: err.message || "An error occurred while loading customer data.",
        });
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        const response = await axios.get("http://localhost:8686/servicecenters/all");
        setServiceCenters(response.data);
      } catch (err) {
        console.error("Error fetching service centers:", err);
        Swal.fire({
          icon: "error",
          title: "Data Fetch Error",
          text: err.message || "An error occurred while loading service centers.",
        });
      }
    };

    fetchServiceCenters();
  }, []);

  useEffect(() => {
    if (location.state && location.state.center) {
      const selectedCenter = location.state.center;
      setFormData((prevData) => ({
        ...prevData,
        serviceCenterID: selectedCenter.serviceCenterID,
      }));
      setSelectedCenterName(selectedCenter.serviceCenterName);
    }
  }, [location.state]);

  useEffect(() => {
    const generateAvailableTimes = () => {
      const times = [];
      for (let hour = 9; hour <= 18; hour++) {
        times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
        times.push(`${hour < 10 ? '0' : ''}${hour}:30`);
      }
      setAvailableTimes(times);
    };

    generateAvailableTimes();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const selectedDate = new Date(formData.appointmentDate);

    if (!formData.appointmentDate) {
      errors.appointmentDate = "Required";
    } else if (selectedDate <= new Date(today)) {
      errors.appointmentDate = "Appointment date must be in the future.";
    }

    if (!formData.appointmentTime) {
      errors.appointmentTime = "Required";
    }

    if (!formData.serviceType) errors.serviceType = "Required";
    if (!formData.appointmentStatus) errors.appointmentStatus = "Required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8686/appointments/add", {
          ...formData,
          customerID: sessionStorage.getItem("customerID"),
          serviceCenterID: formData.serviceCenterID,
          serviceCenterName: selectedCenterName,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Appointment Booked",
            text: "Your appointment has been successfully booked.",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/view-appointments");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: response.data.message || "Please check your input and try again.",
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
        Swal.fire({
          icon: "error",
          title: "Booking Error",
          text: error.response?.data?.message || "An error occurred while booking. Please try again later.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/service-centers");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <Paper
        elevation={3}
        style={{
          flex: 1,
          backgroundColor: "#e1eef2",
          padding: "30px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
          Book Appointment
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCancel}
          aria-label="close"
          style={{ position: "absolute", right: "20px", top: "20px" }}
        >
          <Close />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Username"
              value={customerUsername}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person style={{ color: "#3f51b5" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ readOnly: true }}
              variant="outlined"
              sx={{
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Service Center</InputLabel>
              <Select
                value={selectedCenterName}
                disabled
                sx={{
                  "& .MuiSelect-root": {
                    color: "black",
                  },
                }}
              >
                <MenuItem value={selectedCenterName} style={{ display: "flex", alignItems: "center" }}>
                  <Business style={{ color: "#3f51b5", marginRight: "8px" }} />
                  {selectedCenterName || "No Service Center Selected"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="appointmentDate"
              label="Appointment Date"
              type="date"
              value={formData.appointmentDate}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              error={!!formErrors.appointmentDate}
              helperText={formErrors.appointmentDate}
              inputProps={{ min: today }} // Disable past and today's date
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Event style={{ color: "#f44336" }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              sx={{
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Appointment Time</InputLabel>
              <Select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleFormChange}
                label="Appointment Time"
                error={!!formErrors.appointmentTime}
                startAdornment={
                  <InputAdornment position="start">
                    <AccessTime style={{ color: "#ff9800" }} />
                  </InputAdornment>
                }
              >
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.appointmentTime && (
                <Typography color="error" variant="caption">
                  {formErrors.appointmentTime}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Service Type</InputLabel>
              <Select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleFormChange}
                label="Service Type"
                error={!!formErrors.serviceType}
                startAdornment={
                  <InputAdornment position="start">
                    <Build style={{ color: "#4caf50" }} />
                  </InputAdornment>
                }
              >
                {serviceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.serviceType && (
                <Typography color="error" variant="caption">
                  {formErrors.serviceType}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ backgroundColor: "#4caf50", color: "white" }}
          >
            Submit
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            style={{ backgroundColor: "#f44336", color: "white" }}
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default BookAppointment;



