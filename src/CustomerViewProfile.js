import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const CustomerViewProfile = () => {
  const [customer, setCustomer] = useState(null);
  const customerID = sessionStorage.getItem("customerID"); // Get customerID from sessionStorage

  useEffect(() => {
    const fetchCustomerData = async () => {
        if (!customerID) {
            console.error("No Customer ID found in session storage.");
            return;
          }
      try {
        const response = await axios.get('http://localhost:8686/customer/all'); // Fetch all customers
        const customers = response.data;

        // Filter customer by ID
        const foundCustomer = customers.find(c => c.customerID === parseInt(customerID));
        setCustomer(foundCustomer);
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };

    fetchCustomerData();
  }, [customerID]);

  if (!customer) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        View Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {customer.name}</Typography>
          <Typography variant="h6">Email: {customer.email}</Typography>
          <Typography variant="h6">Address: {customer.address}</Typography>
          <Typography variant="h6">Phone Number: {customer.phoneNumber}</Typography>
          <Typography variant="h6">Password: {'*'.repeat(customer.password.length)}</Typography>
          <Button variant="contained" color="primary" href="/edit-cusprofile" style={{ marginTop: '20px' }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CustomerViewProfile;

