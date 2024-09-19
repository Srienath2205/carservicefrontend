import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import {
  FileUpload,
  Store,
  Email,
  Phone,
  Description,
  LocationOn,
  Close,
  Clear,
} from "@mui/icons-material";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// List of districts for validation
const districts = [
  "madurai", "chennai", "coimbatore", "trichy", "theni", "salem",
  "pondicherry", "erode", "virudhunagar", "dharmapuri", "karur",
  "namakkal", "tirunelveli", "kanyakumari", "thanjavur", "tuticorin", "aruppukottai",
  "villupuram", "rameswaram"
];

// Valid file types for uploads
const validFileTypes = {
  image: ["image/jpeg", "image/png"],
  pdf: ["application/pdf"],
};

// Function to validate file type
const validateFile = (file, type) => {
  if (!file) return false;
  if (type === "image" && validFileTypes.image.includes(file.type)) return true;
  if (type === "pdf" && validFileTypes.pdf.includes(file.type)) return true;
  return false;
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  flexGrow: 1,
  padding: '20px',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const drawerWidth = 240;

const RegisterServiceCenter = () => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    serviceCenterName: "",
    address: "",
    description: "",
    status: "",
    serviceCenterImage: null,
    businessRegistrationCertificate: null,
    insuranceDocument: null,
    ownerIdentityProof: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    serviceCenterImage: "Choose file",
    businessRegistrationCertificate: "Choose file",
    insuranceDocument: "Choose file",
    ownerIdentityProof: "Choose file",
  });
  const [fileInputKeys, setFileInputKeys] = useState({
    serviceCenterImage: Date.now(),
    businessRegistrationCertificate: Date.now(),
    insuranceDocument: Date.now(),
    ownerIdentityProof: Date.now(),
  });
  const [adminDetails, setAdminDetails] = useState({ email: "", contactNumber: "" });
  const navigate = useNavigate();

  const loadAdminDetails = useCallback(async () => {
    try {
      const result = await axios.get("http://localhost:8686/admin/all");
      if (Array.isArray(result.data)) {
        const adminID = sessionStorage.getItem("adminID");
        if (adminID) {
          const admin = result.data.find(admin => admin.adminID == adminID);
          if (admin) {
            setAdminDetails({
              email: admin.email,
              contactNumber: admin.phoneNumber,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  }, []);

  useEffect(() => {
    loadAdminDetails();
  }, [loadAdminDetails]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    if (files) {
      setFileNames((prevNames) => ({
        ...prevNames,
        [name]: files[0].name,
      }));
    }
  };

  const handleClearFile = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: null,
    }));
    setFileNames((prevNames) => ({
      ...prevNames,
      [name]: "Choose file",
    }));
    setFileInputKeys((prevKeys) => ({
      ...prevKeys,
      [name]: Date.now(),
    }));
  };

  const validateForm = () => {
    const errors = {};
    const address = formData.address.trim().toLowerCase();
    const addressParts = address.split(",");
    const district = addressParts.length > 1 ? addressParts[1].trim() : "";

    if (!formData.serviceCenterName) errors.serviceCenterName = "Required";
    if (!formData.address) errors.address = "Required";
    else if (!districts.includes(district)) errors.address = "Invalid district";
    if (!formData.description) errors.description = "Required";

    if (!formData.serviceCenterImage) errors.serviceCenterImage = "Required";
    else if (!validateFile(formData.serviceCenterImage, "image")) errors.serviceCenterImage = "Invalid file type. Only images are allowed.";

    if (!formData.businessRegistrationCertificate) errors.businessRegistrationCertificate = "Required";
    else if (!validateFile(formData.businessRegistrationCertificate, "pdf")) errors.businessRegistrationCertificate = "Invalid file type. Only PDFs are allowed.";

    if (!formData.insuranceDocument) errors.insuranceDocument = "Required";
    else if (!validateFile(formData.insuranceDocument, "pdf")) errors.insuranceDocument = "Invalid file type. Only PDFs are allowed.";

    if (!formData.ownerIdentityProof) errors.ownerIdentityProof = "Required";
    else if (!validateFile(formData.ownerIdentityProof, "image")) errors.ownerIdentityProof = "Invalid file type. Only images are allowed.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('serviceCenterName', formData.serviceCenterName);
      formDataToSubmit.append('address', formData.address);
      formDataToSubmit.append('description', formData.description);

      const addressParts = formData.address.split(",");
      const location = addressParts.length > 1 ? addressParts[1].trim() : "";
      formDataToSubmit.append('location', location);
      formDataToSubmit.append('status', 'Pending');

      const fileFields = [
        'serviceCenterImage',
        'businessRegistrationCertificate',
        'insuranceDocument',
        'ownerIdentityProof'
      ];

      fileFields.forEach(field => {
        if (formData[field]) {
          formDataToSubmit.append(field, formData[field]);
        }
      });

      const adminID = sessionStorage.getItem('adminID');
      if (adminID) {
        formDataToSubmit.append('adminID', adminID);
        formDataToSubmit.append('email', adminDetails.email);
        formDataToSubmit.append('phoneNumber', adminDetails.contactNumber);
      }

      try {
        const response = await axios.post("http://localhost:8686/servicecenters/add", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'The Service Center has been successfully registered.',
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/view-servicecenterstatus");
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: response.data.message || 'Please check your input and try again.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: error.response?.data?.message || 'An error occurred while registering. Please try again later.',
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div style={{
      display: "flex",
      position: "relative",
      height: "120vh",
      backgroundColor: "#f5f5f5", // Remove background image and add a light color
    }}>
      <AdminSidebar open={open} />
      <Main open={open}>
        <div
          style={{
            color: '#03045e',
            padding: '10px 20px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px", // Set a max width for the form
        margin: "0 auto",
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background for form area
        borderRadius: '8px',
      }}>
        <Typography variant="h5" component="div" style={{ marginBottom: "20px", textAlign: 'center' }}>
          Register Service Center
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => navigate("/admin-dashboard")}
            aria-label="close"
            style={{ marginLeft: 'auto' }}
          >
            <Close />
          </IconButton>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="serviceCenterName"
              label="Service Center Name"
              value={formData.serviceCenterName}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Store style={{ color: 'blue' }} /> {/* Colorful icon */}
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.serviceCenterName}
              helperText={formErrors.serviceCenterName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn style={{ color: 'orange' }} /> {/* Colorful icon */}
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description style={{ color: 'green' }} /> {/* Colorful icon */}
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={adminDetails.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: 'purple' }} /> {/* Colorful icon */}
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={adminDetails.contactNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone style={{ color: 'red' }} /> {/* Colorful icon */}
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          {[ 
            { name: 'serviceCenterImage', label: 'Service Center Image', accept: 'image/*' },
            { name: 'businessRegistrationCertificate', label: 'Business Registration Certificate', accept: '.pdf' },
            { name: 'insuranceDocument', label: 'Insurance Document', accept: '.pdf' },
            { name: 'ownerIdentityProof', label: 'Owner Identity Proof', accept: 'image/*' }
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <Typography variant="body1" gutterBottom>
                {field.label}
              </Typography>
              <input
                key={fileInputKeys[field.name]}
                type="file"
                name={field.name}
                onChange={handleFormChange}
                accept={field.accept}
                style={{ display: 'none' }}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: 'green', color: 'white' }}
                component="label"
                onClick={() => document.querySelector(`input[name="${field.name}"]`).click()}
              >
                <FileUpload />
                {fileNames[field.name]}
              </Button>
              <IconButton
                color="error"
                onClick={() => handleClearFile(field.name)}
                aria-label="clear"
              >
                <Clear />
              </IconButton>
              {formErrors[field.name] && <Typography color="error">{formErrors[field.name]}</Typography>}
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outlined"
            style={{ color: 'white', backgroundColor: 'red', marginLeft: '10px' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
      </div>
      </Main>
    </div>
  );
};

export default RegisterServiceCenter;


