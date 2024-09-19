import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const AdminViewProfile = () => {
  const [admin, setAdmin] = useState(null);
  const adminID = sessionStorage.getItem("adminID"); // Get adminID from sessionStorage

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!adminID) {
        console.error("No Admin ID found in session storage.");
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:8686/admin/all`); // Fetch admin by ID
        const admins = response.data;

        // Filter customer by ID
        const foundAdmin = admins.find(a => a.adminID === parseInt(adminID));
        setAdmin(foundAdmin)
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };

    fetchAdminData();
  }, [adminID]);

  if (!admin) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        View Admin Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Username: {admin.username}</Typography>
          <Typography variant="h6">Email: {admin.email}</Typography>
          <Typography variant="h6">Phone Number: {admin.phoneNumber}</Typography>
          <Typography variant="h6">Password: {'*'.repeat(admin.password.length)}</Typography>
          <Button variant="contained" color="primary" href="/edit-adminprofile" style={{ marginTop: '20px' }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminViewProfile;
