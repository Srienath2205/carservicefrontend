import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Grid,
  Divider,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  Phone,
  Email,
  Description,
  LocationOn,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import CustomerSideBar from "./CustomerSideBar";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: 400,
  maxWidth: 400,
  width: 400,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const StyledMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  width: "100%",
}));

const ButtonsContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  backgroundColor: "#03045e",
  color: "white",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: "#009688",
  color: "white",
  "&:hover": {
    backgroundColor: "#00796b",
  },
}));

const CustomerViewCenters = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [approvedCenters, setApprovedCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [fileUrls, setFileUrls] = useState({});
  const [viewFile, setViewFile] = useState(null);

  useEffect(() => {
    const fetchApprovedCenters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8686/servicecenters/getApprovedRequestList"
        );
        setApprovedCenters(response.data);
        setFilteredCenters(response.data); // Initialize filtered centers
      } catch (error) {
        console.error("Error fetching approved centers:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error fetching the approved requests!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8686/servicecenters/locations"
        );
        setLocations(["All", ...response.data]); // Add 'All' option
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchApprovedCenters();
    fetchLocations();
  }, []);

  // Filter centers based on selected location
  useEffect(() => {
    if (selectedLocation === "All") {
      setFilteredCenters(approvedCenters);
    } else {
      setFilteredCenters(
        approvedCenters.filter((center) => center.location === selectedLocation)
      );
    }
  }, [selectedLocation, approvedCenters]);

  useEffect(() => {
    console.log("Selected Center Changed:", selectedCenter);
  }, [selectedCenter]);

  const handleOpenViewMore = (center) => {
    setSelectedCenter(center);
    console.log("Selected Center:", center);
    // setFileUrls({
    //   serviceCenterImage: center.serviceCenterImage
    //     ? `data:image/jpeg;base64,${center.serviceCenterImage}`
    //     : "",
    //   businessRegistrationCertificate: center.businessRegistrationCertificate
    //     ? `data:application/pdf;base64,${center.businessRegistrationCertificate}`
    //     : "",
    //   insuranceDocument: center.insuranceDocument
    //     ? `data:application/pdf;base64,${center.insuranceDocument}`
    //     : "",
    //   ownerIdentityProof: center.ownerIdentityProof
    //     ? `data:image/jpeg;base64,${center.ownerIdentityProof}`
    //     : "",
    // });
    setOpenViewMore(true);
  };

  const handleClose = () => {
    setOpenViewMore(false);
    setFileUrls({});
    setViewFile(null);
  };

  const handleBookAppointment = () => {
    console.log("Before Navigate - Selected Center:", selectedCenter);
    if (selectedCenter) {
      navigate("/bookappointment", { state: { center: selectedCenter } });
    }else {
      console.error("No service center selected!");
      Swal.fire({
        title: 'Error',
        text: 'Please select a service center before booking an appointment.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  return (
    <div style={{ display: "flex", position: "relative", height: "100vh" }}>
      <CustomerSideBar open={open} />
      <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 20px",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#03045e", mb: 4 }}
          >
            View Service Centers
          </Typography>

          {/* Location Filter */}
          <FormControl
            variant="outlined"
            sx={{ marginBottom: "20px", width: "50%" }}
          >
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              label="Location"
            >
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filteredCenters.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <Typography variant="h6" color="#03045e">
              No Service Centers Available
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {filteredCenters.map((center) => (
              <StyledCard key={center.serviceCenterID}>
                <StyledMedia
                  image={`data:image/jpeg;base64,${center.serviceCenterImage}`}
                  title={center.serviceCenterName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {center.serviceCenterName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {center.address}
                  </Typography>
                  <ButtonsContainer>
                    <Tooltip title="View More" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenViewMore(center)}
                      >
                        <Visibility /> View
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Book Appointment" arrow>
                      <StyledButton onClick={handleBookAppointment}>
                        Book Appointment
                      </StyledButton>
                    </Tooltip>
                  </ButtonsContainer>
                </CardContent>
              </StyledCard>
            ))}
          </Box>
        )}

        <Dialog
          open={openViewMore}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitleStyled>View More Information</DialogTitleStyled>
          <DialogContent>
            {selectedCenter && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <LocationOn sx={{ color: "#03a9f4" }} /> Service Center
                    Name:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.serviceCenterName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <LocationOn sx={{ color: "#03a9f4" }} /> Address:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <LocationOn sx={{ color: "#03a9f4" }} /> Location:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <Description sx={{ color: "#03a9f4" }} /> Description:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <Phone sx={{ color: "#03a9f4" }} /> Phone Number:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <Email sx={{ color: "#03a9f4" }} /> Email:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.email}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Main>
    </div>
  );
};

export default CustomerViewCenters;
