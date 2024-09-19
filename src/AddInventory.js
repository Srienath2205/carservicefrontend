import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { styled } from "@mui/material";
import axios from "axios";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0,
    flexGrow: 1,
    padding: "20px",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

const AddInventoryForm = () => {
  const [partName, setPartName] = useState("");
  const [description, setDescription] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [reorderLimit, setReorderLimit] = useState("");
  const [price, setPrice] = useState("");
  const [serviceCenterID, setServiceCenterID] = useState("");
  const [serviceCenters, setServiceCenters] = useState([]);
  const [partImage, setPartImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [superAdminID, setSuperAdminID] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const adminId = sessionStorage.getItem("superAdminID");
    setSuperAdminID(adminId);

    axios
      .get("http://localhost:8686/servicecenters/all")
      .then((response) => {
        setServiceCenters(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load service centers.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (reorderLimit >= quantityInStock) {
      setError("Reorder limit must be less than quantity in stock.");
      return;
    }

    if (
      !partName ||
      !description ||
      !quantityInStock ||
      !reorderLimit ||
      !price ||
      !serviceCenterID
    ) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("partName", partName);
    formData.append("description", description);
    formData.append("quantityInStock", quantityInStock);
    formData.append("reorderLimit", reorderLimit);
    formData.append("price", price);
    formData.append("serviceCenterID", serviceCenterID);
    formData.append("superAdminID", superAdminID);
    if (partImage) {
      formData.append("partImage", partImage);
    }

    axios
      .post("http://localhost:8686/inventory/add", formData)
      .then((response) => {
        setSuccess("Part added successfully!");
        setError("");
        // Reset form fields
        setPartName("");
        setDescription("");
        setQuantityInStock("");
        setReorderLimit("");
        setPrice("");
        setServiceCenterID("");
        setPartImage(null);
        // Navigate to view-inventory
        navigate("/view-inventory");
      })
      .catch((error) => {
        setError("Failed to add part. Please try again.");
        setSuccess("");
      });
  };

  return (
    <div>
      <SuperAdminSidebar open={open} />
      <Main open={open}>
        <Container>
          <h2
            style={{
              color: "#03045e",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Add Inventory
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formPartName">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Part Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Part Name"
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formQuantityInStock">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Quantity in Stock
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantityInStock}
                    onChange={(e) => setQuantityInStock(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formReorderLimit">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Reorder Limit
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Reorder Limit"
                    value={reorderLimit}
                    onChange={(e) => setReorderLimit(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPrice">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formServiceCenter">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Service Center
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={serviceCenterID}
                    onChange={(e) => setServiceCenterID(e.target.value)}
                    required
                  >
                    <option value="">Select Service Center</option>
                    {serviceCenters.map((center) => (
                      <option
                        key={center.serviceCenterID}
                        value={center.serviceCenterID}
                      >
                        {center.serviceCenterName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPartImage">
                  <Form.Label
                    style={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    Part Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPartImage(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Add Part
            </Button>
          </Form>
        </Container>
      </Main>
    </div>
  );
};

export default AddInventoryForm;
