// import React, { useEffect, useState } from 'react';
// import { Container, Typography, TextField, Button, Alert } from '@mui/material';
// import axios from 'axios';

// const SuperAdminEditProfile = () => {
//   const [superAdmin, setSuperAdmin] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const superAdminID = sessionStorage.getItem("superAdminID"); // Get superAdminID from sessionStorage

//   useEffect(() => {
//     const fetchSuperAdminData = async () => {
//       if (!superAdminID) {
//         console.error("No Super Admin ID found in session storage.");
//         return;
//       }
      
//       try {
//         const response = await axios.get(`http://localhost:8686/superadmin/all`); // Fetch all super admins
//         const superAdmins = response.data;

//         // Filter to find the specific super admin by ID
//         const foundSuperAdmin = superAdmins.find(admin => admin.superAdminID === parseInt(superAdminID));
//         setSuperAdmin(foundSuperAdmin);
//       } catch (error) {
//         console.error("Error fetching super admin data", error);
//       }
//     };

//     fetchSuperAdminData();
//   }, [superAdminID]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!oldPassword || !newPassword || !confirmPassword) {
//       setError('All fields are required.');
//       return;
//     }

//     if (newPassword === oldPassword) {
//       setError('New password must be different from old password.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('New password and confirm password must match.');
//       return;
//     }

//     if (superAdmin && oldPassword !== superAdmin.password) {
//       setError('Old password is incorrect.');
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:8686/superadmin/update/${superAdminID}`, {
//         oldPassword,
//         newPassword,
//       });

//       if (response.status === 200) {
//         setSuccess('Password updated successfully.');
//         // Optionally, reset form fields
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       }
//     } catch (error) {
//       setError('An error occurred while updating the password.');
//       console.error("Error updating password", error);
//     }
//   };

//   if (!superAdmin) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Edit Super Admin Profile
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email"
//           value={superAdmin.email}
//           disabled
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Old Password"
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="New Password"
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Confirm New Password"
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         {error && <Alert severity="error">{error}</Alert>}
//         {success && <Alert severity="success">{success}</Alert>}
//         <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
//           Update Profile
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default SuperAdminEditProfile;

