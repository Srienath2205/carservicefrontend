import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#03045e', // Updated solid color
        color: 'white',
        padding: '1rem 0', // Adjusted padding for better spacing
        marginTop: '2rem',
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {/* About Us Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <HomeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to offering top-notch car maintenance and repair services. Our team ensures that every vehicle receives the best care to keep it running smoothly.
            </Typography>
          </Grid>
          {/* Quick Links Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
              <li>
                <Link href="#welcome" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                  <HomeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="#aboutus" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ContactMailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Contact Us
                </Link>
              </li>
            </ul>
          </Grid>
          {/* Contact Information Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <ContactMailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              456 Auto Lane, Vilangudi, CA 67890
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Email: support@autocarehub.com
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Phone: (987) 654-3210
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderTop: '1px solid #333',
            marginTop: '1rem',
            paddingTop: '0.5rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} AutoCareHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


