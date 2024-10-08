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
  Paper,
  styled,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Visibility,
  Download,
  PictureAsPdf,
  Edit,
  Delete as DeleteIcon,
  LocationOn,
  Phone,
  Email,
  Description,
  DateRange,
} from "@mui/icons-material";
import SuperAdminSidebar from "./SuperAdminSidebar";
import Swal from "sweetalert2";

// Styled components
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

const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  backgroundColor: "#03045e",
  color: "white",
}));

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
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

const UpdateDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    minWidth: "400px",
  },
}));

const SuperAdminViewCenters = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [approvedCenters, setApprovedCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [fileUrls, setFileUrls] = useState({});
  const [viewFile, setViewFile] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    // Fetch approved service centers
    axios
      .get("http://localhost:8686/servicecenters/getApprovedRequestList")
      .then((response) => {
        setApprovedCenters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching approved centers:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error fetching the approved requests!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    // Fetch distinct locations
    axios
      .get("http://localhost:8686/servicecenters/locations")
      .then((response) => {
        setLocations(["All", ...response.data]); // Add 'All' option for filtering
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const handleOpenViewMore = (center) => {
    setSelectedCenter(center);
    setFileUrls({
      serviceCenterImage: center.serviceCenterImage
        ? `data:image/jpeg;base64,${center.serviceCenterImage}`
        : "",
      businessRegistrationCertificate: center.businessRegistrationCertificate
        ? `data:application/pdf;base64,${center.businessRegistrationCertificate}`
        : "",
      insuranceDocument: center.insuranceDocument
        ? `data:application/pdf;base64,${center.insuranceDocument}`
        : "",
      ownerIdentityProof: center.ownerIdentityProof
        ? `data:image/jpeg;base64,${center.ownerIdentityProof}`
        : "",
    });
    setOpenViewMore(true);
  };

  const handleClose = () => {
    setOpenViewMore(false);
    setOpenUpdateDialog(false);
    setSelectedCenter(null);
    setFileUrls({});
    setViewFile(null);
  };

  const handleDownload = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const handleView = (fileUrl, fileType) => {
    setViewFile({ url: fileUrl, type: fileType });
  };

  const handleUpdateOpen = (center) => {
    setSelectedCenter(center);
    setFormData({
      serviceCenterName: center.serviceCenterName,
      address: center.address,
      location: center.location,
      description: center.description,
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateSubmit = () => {
    // Make API call to update center details
    axios
      .put(
        `http://localhost:8686/servicecenters/update/${selectedCenter.serviceCenterID}`,
        formData
      )
      .then(() => {
        Swal.fire("Success", "Service center updated successfully!", "success");
        setOpenUpdateDialog(false);
        // Refresh the list of centers
        axios
          .get("http://localhost:8686/servicecenters/getApprovedRequestList")
          .then((response) => {
            setApprovedCenters(response.data);
          });
      })
      .catch((error) => {
        console.error("Error updating center:", error);
        Swal.fire(
          "Error",
          "There was an error updating the service center!",
          "error"
        );
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this service center!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8686/servicecenters/delete/${id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The service center has been deleted.",
              "success"
            );
            // Refresh the list of centers
            setApprovedCenters((prev) =>
              prev.filter((center) => center.serviceCenterID !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting center:", error);
            Swal.fire(
              "Error",
              "There was an error deleting the service center!",
              "error"
            );
          });
      }
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Filter approved centers by location
  const filteredCenters = approvedCenters.filter((center) => {
    return selectedLocation === "All" || center.location === selectedLocation;
  });

  return (
    <div style={{ display: "flex", position: "relative", height: "100vh" }}>
      <SuperAdminSidebar open={open} />
      <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
        {/* Title Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 20px",
            color: "#fff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#03045e" }}
            >
              View Service Centers
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              mb: 2,
            }}
          >
            <StyledButton onClick={() => navigate("/center-approval")}>
              Pending Approvals
            </StyledButton>
          </Box>
          {/* Location Filter */}
          <Box
            sx={{
              mb: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, color: "#03045e" }}>
              Location Filter
            </Typography>
            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#03045e", // Initial border color
                  },
                  "&:hover fieldset": {
                    borderColor: "green", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Border color when focused
                    boxShadow: "0 0 5px rgba(0, 128, 0, 0.5)", // Shadow when focused
                  },
                },
                minWidth: 150, // Adjust the width to make it smaller
                height: 40, // Set a specific height
              }}
              startAdornment={
                <Box sx={{ mr: 1 }}>
                  <LocationOn sx={{ color: "#03045e" }} />
                </Box>
              }
            >
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Cards for Approved Centers */}
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
                        <Visibility />
                        View
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(center.serviceCenterID)}
                      >
                        <DeleteIcon />
                        Delete
                      </IconButton>
                    </Tooltip>
                  </ButtonsContainer>
                </CardContent>
              </StyledCard>
            ))}
          </Box>
        )}

        {/* View More Dialog */}
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
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <DateRange sx={{ color: "#03a9f4" }} /> Status:
                  </Typography>
                  <Typography variant="body1">
                    {selectedCenter.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">
                    <DateRange sx={{ color: "#03a9f4" }} /> Approval Date:
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedCenter.approvalDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <DialogContent>
                    {selectedCenter && (
                      <div>
                        <Divider sx={{ my: 2 }} />
                        <Grid container spacing={2}>
                          {selectedCenter.serviceCenterImage && (
                            <Grid item xs={12} md={6}>
                              <CenteredBox>
                                <Box>
                                  <Typography>Service Center Image</Typography>
                                  <Box display="flex" alignItems="center">
                                    <Button
                                      onClick={() =>
                                        handleView(
                                          fileUrls.serviceCenterImage,
                                          "image"
                                        )
                                      }
                                      startIcon={<Visibility />}
                                      variant="contained"
                                    >
                                      View
                                    </Button>
                                    <StyledButton
                                      onClick={() =>
                                        handleDownload(
                                          fileUrls.serviceCenterImage,
                                          "serviceCenterImage.jpg"
                                        )
                                      }
                                      startIcon={<Download />}
                                      variant="contained"
                                    >
                                      Download
                                    </StyledButton>
                                  </Box>
                                </Box>
                              </CenteredBox>
                            </Grid>
                          )}
                          {selectedCenter.businessRegistrationCertificate && (
                            <Grid item xs={12} md={6}>
                              <CenteredBox>
                                <Box>
                                  <Typography>
                                    Business Registration Certificate
                                  </Typography>
                                  <Box display="flex" alignItems="center">
                                    <Button
                                      onClick={() =>
                                        handleView(
                                          fileUrls.businessRegistrationCertificate,
                                          "pdf"
                                        )
                                      }
                                      startIcon={<PictureAsPdf />}
                                      variant="contained"
                                    >
                                      View
                                    </Button>
                                    <StyledButton
                                      onClick={() =>
                                        handleDownload(
                                          fileUrls.businessRegistrationCertificate,
                                          "businessRegistrationCertificate.pdf"
                                        )
                                      }
                                      startIcon={<Download />}
                                      variant="contained"
                                    >
                                      Download
                                    </StyledButton>
                                  </Box>
                                </Box>
                              </CenteredBox>
                            </Grid>
                          )}
                          {selectedCenter.insuranceDocument && (
                            <Grid item xs={12} md={6}>
                              <CenteredBox>
                                <Box>
                                  <Typography>Insurance Document</Typography>
                                  <Box display="flex" alignItems="center">
                                    <Button
                                      onClick={() =>
                                        handleView(
                                          fileUrls.insuranceDocument,
                                          "pdf"
                                        )
                                      }
                                      startIcon={<PictureAsPdf />}
                                      variant="contained"
                                    >
                                      View
                                    </Button>
                                    <StyledButton
                                      onClick={() =>
                                        handleDownload(
                                          fileUrls.insuranceDocument,
                                          "insuranceDocument.pdf"
                                        )
                                      }
                                      startIcon={<Download />}
                                      variant="contained"
                                    >
                                      Download
                                    </StyledButton>
                                  </Box>
                                </Box>
                              </CenteredBox>
                            </Grid>
                          )}
                          {selectedCenter.ownerIdentityProof && (
                            <Grid item xs={12} md={6}>
                              <CenteredBox>
                                <Box>
                                  <Typography>Owner Identity Proof</Typography>
                                  <Box display="flex" alignItems="center">
                                    <Button
                                      onClick={() =>
                                        handleView(
                                          fileUrls.ownerIdentityProof,
                                          "image"
                                        )
                                      }
                                      startIcon={<Visibility />}
                                      variant="contained"
                                    >
                                      View
                                    </Button>
                                    <StyledButton
                                      onClick={() =>
                                        handleDownload(
                                          fileUrls.ownerIdentityProof,
                                          "ownerIdentityProof.jpg"
                                        )
                                      }
                                      startIcon={<Download />}
                                      variant="contained"
                                    >
                                      Download
                                    </StyledButton>
                                  </Box>
                                </Box>
                              </CenteredBox>
                            </Grid>
                          )}
                        </Grid>
                      </div>
                    )}
                  </DialogContent>
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

        {/* View File Component */}
        {viewFile && (
          <Dialog
            open
            onClose={() => setViewFile(null)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitleStyled>File Viewer</DialogTitleStyled>
            <DialogContent>
              {viewFile.type === "pdf" ? (
                <iframe
                  src={viewFile.url}
                  style={{ width: "100%", height: "80vh" }}
                  frameBorder="0"
                />
              ) : (
                <img
                  src={viewFile.url}
                  alt="File Preview"
                  style={{ width: "100%", height: "80vh" }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewFile(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </Main>
    </div>
  );
};

export default SuperAdminViewCenters;
