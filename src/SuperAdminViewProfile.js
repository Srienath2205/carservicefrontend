import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const SuperAdminViewProfile = () => {
  const [superAdmin, setSuperAdmin] = useState(null);
  const superAdminID = sessionStorage.getItem("superAdminID"); // Get superAdminID from sessionStorage

  useEffect(() => {

    const fetchSuperAdminData = async () => {
      if (!superAdminID) {
        console.error("No Super Admin ID found in session storage.");
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:8686/superadmin/all`); // Fetch all super admins
        const superAdmins = response.data;

        // Filter super admin by ID
        const foundSuperAdmin = superAdmins.find(a => a.superAdminID === parseInt(superAdminID));
        setSuperAdmin(foundSuperAdmin);
    } catch (error) {
        console.error("Error fetching super admin data", error);
    }

    
};
    

    fetchSuperAdminData();
  }, [superAdminID]);

  if (!superAdmin) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        View Super Admin Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Email: {superAdmin.email}</Typography>
          <Typography variant="h6">Password: {'*'.repeat(superAdmin.password.length)}</Typography>
          <Button variant="contained" color="primary" href="/edit-superadminprofile" style={{ marginTop: '20px' }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SuperAdminViewProfile;
