import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import {
  AddCircle as AddCircleIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import CustomerSideBar from "./CustomerSideBar";

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764, #1D2671)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(45deg, #C33764, #1D2671)",
  },
}));

const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#007bff",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#fff",
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.875rem",
  },
  "& .MuiInputBase-input": {
    color: "#000",
    fontSize: "0.875rem",
    padding: "0.5rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#454545",
  },
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764, #1D2671)",
  color: "#fff",
  padding: theme.spacing(3),
  border: "1px solid #fff",
  borderRadius: "12px",
}));

const Vehicle = () => {
  const [open, setOpen] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    vehicleImage: null,
    registrationCertificate: null,
    vehicleImageName: "",
    registrationCertificateName: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const customerID = sessionStorage.getItem("customerID");

  useEffect(() => {
    axios
      .get("http://localhost:8686/vehicle/all")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const handleAddVehicle = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewVehicle({
      make: "",
      model: "",
      year: "",
      vin: "",
      vehicleImage: null,
      registrationCertificate: null,
      vehicleImageName: "",
      registrationCertificateName: "",
    });
    setValidationErrors({});
  };

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!newVehicle.make.trim()) {
      errors.make = "Make is required.";
      isValid = false;
    }

    if (!newVehicle.model.trim()) {
      errors.model = "Model is required.";
      isValid = false;
    }

    if (!newVehicle.year || isNaN(newVehicle.year)) {
      errors.year = "Year is required and must be a number.";
      isValid = false;
    }

    if (!newVehicle.vin.trim()) {
      errors.vin = "VIN is required.";
      isValid = false;
    } else if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(newVehicle.vin)) {
      errors.vin = "VIN must be 17 characters long, excluding I, O, Q.";
      isValid = false;
    }

    if (!newVehicle.vehicleImage) {
      errors.vehicleImage = "Vehicle image is required.";
      isValid = false;
    } else if (!["image/png", "image/jpeg"].includes(newVehicle.vehicleImage.type)) {
      errors.vehicleImage = "Vehicle image must be PNG or JPEG.";
      isValid = false;
    }

    if (!newVehicle.registrationCertificate) {
      errors.registrationCertificate = "Registration certificate is required.";
      isValid = false;
    } else if (!["application/pdf", "image/png", "image/jpeg"].includes(newVehicle.registrationCertificate.type)) {
      errors.registrationCertificate = "Registration certificate must be PDF, PNG, or JPEG.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setNewVehicle({
      ...newVehicle,
      [name]: files[0],
      [`${name}Name`]: files[0]?.name || "",
    });
  };

  const handleClearFile = (name) => {
    setNewVehicle({ ...newVehicle, [name]: null, [`${name}Name`]: "" });
  };

  const handleAddVehicleSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    formData.append("make", newVehicle.make);
    formData.append("model", newVehicle.model);
    formData.append("year", newVehicle.year);
    formData.append("vin", newVehicle.vin);
    formData.append("customerID", customerID);
    if (newVehicle.vehicleImage) formData.append("vehicleImage", newVehicle.vehicleImage);
    if (newVehicle.registrationCertificate) formData.append("registrationCertificate", newVehicle.registrationCertificate);

    axios
      .post("http://localhost:8686/vehicle/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setVehicles([...vehicles, response.data]);
        handleCancelAdd();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Vehicle added successfully!",
          confirmButtonColor: "#1D2671",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/view-vehicle");
        });
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add vehicle. Please try again.",
          confirmButtonColor: "#1D2671",
        });
      });
  };

  return (
    <div>
      <CustomerSideBar open={open} handleDrawerClose={() => setOpen(false)} />
      <Box>
        <Container>
          <Box sx={{ textAlign: "center", mb: 3, mt: 4 }}>
            <Typography variant="h4" sx={{ color: "#03045e", mb: 2 }}>
              Vehicle Details
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <GradientButton variant="contained" onClick={handleAddVehicle}>
                <AddCircleIcon sx={{ mr: 1 }} />
                Add New Vehicle
              </GradientButton>
            </Box>
          </Box>

          {showAddForm && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 4 }}>
              <GradientCard sx={{ maxWidth: 800, width: "100%" }}>
                <CardContent>
                  <form onSubmit={handleAddVehicleSubmit}>
                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" sx={{ mb: 1, color: "#fff", fontWeight: "bold" }}>
                        Make
                      </Typography>
                      <StyledTextField
                        name="make"
                        value={newVehicle.make}
                        onChange={handleInputChange}
                        error={Boolean(validationErrors.make)}
                        helperText={validationErrors.make}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" sx={{ mb: 1, color: "#fff", fontWeight: "bold" }}>
                        Model
                      </Typography>
                      <StyledTextField
                        name="model"
                        value={newVehicle.model}
                        onChange={handleInputChange}
                        error={Boolean(validationErrors.model)}
                        helperText={validationErrors.model}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" sx={{ mb: 1, color: "#fff", fontWeight: "bold" }}>
                        Year
                      </Typography>
                      <StyledTextField
                        name="year"
                        type="number"
                        value={newVehicle.year}
                        onChange={handleInputChange}
                        error={Boolean(validationErrors.year)}
                        helperText={validationErrors.year}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <Typography variant="body1" sx={{ mb: 1, color: "#fff", fontWeight: "bold" }}>
                        VIN
                      </Typography>
                      <StyledTextField
                        name="vin"
                        value={newVehicle.vin}
                        onChange={handleInputChange}
                        error={Boolean(validationErrors.vin)}
                        helperText={validationErrors.vin}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px", padding: "8px" }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<ImageIcon />}
                        sx={{
                          backgroundColor: "#4caf50",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#388e3c" },
                        }}
                      >
                        Upload Vehicle Image
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          name="vehicleImage"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {newVehicle.vehicleImageName && (
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="body2" sx={{ color: "#000", mr: 1 }}>
                            {newVehicle.vehicleImageName}
                          </Typography>
                          <IconButton onClick={() => handleClearFile("vehicleImage")}>
                            <CloseIcon sx={{ color: "#000" }} />
                          </IconButton>
                        </Box>
                      )}
                      {validationErrors.vehicleImage && (
                        <FormHelperText error>
                          {validationErrors.vehicleImage}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth margin="normal" sx={{ backgroundColor: "#fff", borderRadius: "8px", padding: "8px" }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<DescriptionIcon />}
                        sx={{
                          backgroundColor: "#4caf50",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#388e3c" },
                        }}
                      >
                        Upload Registration Certificate
                        <input
                          type="file"
                          accept="application/pdf, image/png, image/jpeg"
                          name="registrationCertificate"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {newVehicle.registrationCertificateName && (
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Typography variant="body2" sx={{ color: "#000", mr: 1 }}>
                            {newVehicle.registrationCertificateName}
                          </Typography>
                          <IconButton onClick={() => handleClearFile("registrationCertificate")}>
                            <CloseIcon sx={{ color: "#000" }} />
                          </IconButton>
                        </Box>
                      )}
                      {validationErrors.registrationCertificate && (
                        <FormHelperText error>
                          {validationErrors.registrationCertificate}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Box sx={{ mt: 2 }}>
                      <BlueButton type="submit">
                        Add Vehicle
                      </BlueButton>
                      <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ ml: 2 }}
                        onClick={handleCancelAdd}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </GradientCard>
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Vehicle;
