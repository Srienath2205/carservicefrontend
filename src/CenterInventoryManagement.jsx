import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { styled } from '@mui/material';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import AdminSidebar from './AdminSidebar';

const drawerWidth = 240;

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

const CenterInventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(true);
  
    useEffect(() => {
      fetchInventory();
    }, []);
  
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8686/inventory/all");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error.response ? error.response.data : error.message);
        setError("Failed to load inventory data.");
      }
    };
  
    // Data for the bar chart
    const chartData = {
      labels: inventory.map(part => part.partName),
      datasets: [
        {
          label: 'Quantity in Stock',
          data: inventory.map(part => part.quantityInStock),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }
      ]
    };
  
    return (
      <div>
        <AdminSidebar open={open} />
        <Main open={open}>
          <Container>
            <Row className="mb-4">
              <Col>
                <h2 style={{
                  color: "#03045e",
                  fontWeight: "bold",
                  textAlign: "center",
                }}>Inventory Management</h2>
              </Col>
            </Row>
  
            {error && <div className="error-message mb-4">{error}</div>}
  
            <Row className="mb-4">
              <Col>
                <Bar data={chartData} />
              </Col>
            </Row>
  
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Part ID</th>
                      <th>Part Name</th>
                      <th>Description</th>
                      <th>Part Image</th>
                      <th>Quantity in Stock</th>
                      <th>Reorder Limit</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(part => (
                      <tr key={part.partID}>
                        <td>{part.partID}</td>
                        <td>{part.partName}</td>
                        <td>{part.description}</td>
                        <td>
                          {part.partImage && (
                            <img 
                              src={`data:image/jpeg;base64,${part.partImage}`} 
                              alt={part.partName} 
                              style={{ width: '50px', height: '50px' }} 
                            />
                          )}
                        </td>
                        <td>{part.quantityInStock}</td>
                        <td>{part.reorderLimit}</td>
                        <td>${part.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Main>  
      </div>
    );
  };

export default CenterInventoryManagement;
