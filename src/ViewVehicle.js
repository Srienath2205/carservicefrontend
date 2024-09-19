import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerSideBar from "./CustomerSideBar";
import { styled } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon, Info as InfoIcon } from "@mui/icons-material";

const drawerWidth = 240;

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const VehicleCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  boxShadow: theme.shadows[3],
}));

const VehicleImage = styled(CardMedia)(({ theme }) => ({
  height: 180,
  width: '100%',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
}));

const VehicleActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #C33764 30%, #1D2671 90%)',
  border: 'none',
  color: 'white',
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  fontSize: '16px',
  '&:hover': {
    background: 'linear-gradient(45deg, #C33764 40%, #1D2671 100%)',
  },
}));

function ViewVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [certificateType, setCertificateType] = useState("");
  const navigate = useNavigate();

  const customerID = sessionStorage.getItem("customerID");

  useEffect(() => {
    if (customerID) {
      // Fetch vehicles and filter by customerID
      axios
        .get("http://localhost:8686/vehicle/all")
        .then((response) => {
          const filteredVehicles = response.data.filter(vehicle => vehicle.customerID == customerID);
          setVehicles(filteredVehicles);
          setError("");
        })
        .catch((error) => {
          console.error('Error fetching vehicles:', error.response ? error.response.data : error.message);
          setVehicles([]);
          setError("Failed to load vehicles.");
        });
    }
  }, [customerID]);

  const handleViewInfo = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCertificateType(vehicle.registrationCertificateType || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setCertificateType("");
  };

  const handleDelete = (id) => {
    setShowDeleteConfirmModal(true);
    setSelectedVehicle(vehicles.find(vehicle => vehicle.vehicleID === id));
  };

  const confirmDelete = () => {
    if (selectedVehicle) {
      axios
        .delete(`http://localhost:8686/vehicle/delete/${selectedVehicle.vehicleID}`)
        .then(() => {
          setVehicles(vehicles.filter((vehicle) => vehicle.vehicleID !== selectedVehicle.vehicleID));
          setError("");
          setShowDeleteConfirmModal(false);
          setSelectedVehicle(null);
        })
        .catch((error) => {
          console.error('Error deleting vehicle:', error.response ? error.response.data : error.message);
          setError("Failed to delete vehicle.");
        });
    }
  };

  const handleViewCertificate = () => {
    setShowCertificateModal(true);
  };

  const handleCloseCertificateModal = () => {
    setShowCertificateModal(false);
  };

  const handleAddVehicle = () => {
    navigate("/vehicle");
  };

  return (
    <div style={{ display: 'flex' }}>
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={() => setSidebarOpen(false)} />
      <MainContent>
        <Container>
          <Row className="mb-4 align-items-center">
            <Col>
              <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' }}>
                Available Vehicles
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <GradientButton onClick={handleAddVehicle}>
                Add Vehicle
              </GradientButton>
            </Col>
          </Row>

          {error && vehicles.length === 0 && (
            <div className="error-message mb-4">{error}</div>
          )}

          {vehicles.length === 0 && !error && (
            <Row>
              <Col>
                <center>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    No vehicles available.
                  </Typography>
                </center>
              </Col>
            </Row>
          )}

          <Row>
            {vehicles.map((vehicle) => (
              <Col xs={12} sm={6} md={4} key={vehicle.vehicleID} className="mb-4">
                <VehicleCard>
                  {vehicle.vehicleImage && (
                    <VehicleImage
                      image={`data:image/jpeg;base64,${vehicle.vehicleImage}`}
                      title={`${vehicle.make} ${vehicle.model}`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {vehicle.make} {vehicle.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Year:</strong> {vehicle.year}
                    </Typography>
                  </CardContent>
                  <VehicleActions>
                    <Tooltip title="View Info">
                      <IconButton color="primary" onClick={() => handleViewInfo(vehicle)}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(vehicle.vehicleID)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </VehicleActions>
                </VehicleCard>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Modal for Vehicle Details */}
        {selectedVehicle && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedVehicle.make} {selectedVehicle.model}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedVehicle.vehicleImage && (
                <img
                  src={`data:image/jpeg;base64,${selectedVehicle.vehicleImage}`}
                  alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                  className="img-fluid mb-3"
                />
              )}
              <Typography variant="body1" paragraph>
                <strong>Year:</strong> {selectedVehicle.year}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>VIN:</strong> {selectedVehicle.vin}
              </Typography>
              <Button variant="primary" onClick={handleViewCertificate}>
                View Registration Certificate
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Modal for Viewing Registration Certificate */}
        {selectedVehicle && (
          <Modal show={showCertificateModal} onHide={handleCloseCertificateModal}>
            <Modal.Header closeButton>
              <Modal.Title>Registration Certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedVehicle.registrationCertificate ? (
                certificateType === "pdf" ? (
                  <iframe
                    src={`data:application/pdf;base64,${selectedVehicle.registrationCertificate}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${selectedVehicle.registrationCertificate}`}
                    alt="Registration Certificate"
                    style={{ width: '100%', height: 'auto' }}
                  />
                )
              ) : (
                <Typography variant="body1">No certificate available.</Typography>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCertificateModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Confirmation Modal for Delete */}
        <Modal show={showDeleteConfirmModal} onHide={() => setShowDeleteConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedVehicle?.make} {selectedVehicle?.model}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </MainContent>
    </div>
  );
}

export default ViewVehicle;
