// import React, { useEffect, useState } from 'react';
// import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
// import axios from 'axios';

// const AdminEditProfile = () => {
//   const [admin, setAdmin] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const adminID = sessionStorage.getItem("adminID");

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8686/admin/all`);
//         const customers = response.data;

//         // Filter customer by ID
//         const foundCustomer = customers.find(c => c.customerID === parseInt(customerID));
//         setCustomer(foundCustomer);
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//       }
//     };

//     fetchCustomerData();
//   }, [customerID]);

//   if (!customer) return <Typography>Loading...</Typography>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (newPassword === oldPassword) {
//       setMessage("New password must not match old password.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setMessage("Confirm password must match new password.");
//       return;
//     }

//     try {
//       // Make a request to verify the old password
//       const response = await axios.get(`http://localhost:8686/admin/login/${admin.email}/${oldPassword}`);
//       if (!response.data) {
//         setMessage("Old password is incorrect.");
//         return;
//       }

//       // Update admin details including the new password
//       const updatedAdmin = { ...admin, password: newPassword };
//       await axios.put(`http://localhost:8686/admin/update/${adminID}`, updatedAdmin);

//       setMessage("Admin profile updated successfully.");
//     } catch (error) {
//       console.error("Error updating admin data", error);
//       setMessage("Failed to update admin profile.");
//     }
//   };

//   if (!admin) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Edit Admin Profile</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           value={admin.username}
//           fullWidth
//           margin="normal"
//           disabled
//         />
//         <TextField
//           label="Email"
//           value={admin.email}
//           fullWidth
//           margin="normal"
//           disabled
//         />
//         <TextField
//           label="Phone Number"
//           value={admin.phoneNumber}
//           fullWidth
//           margin="normal"
//           onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}
//         />
//         <TextField
//           label="Old Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           onChange={(e) => setOldPassword(e.target.value)}
//           required
//         />
//         <TextField
//           label="New Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <TextField
//           label="Confirm Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
//           Update Profile
//         </Button>
//       </form>
//       <Snackbar
//         open={!!message}
//         onClose={() => setMessage('')}
//         message={message}
//         autoHideDuration={6000}
//       />
//     </Container>
//   );
// };

// export default AdminEditProfile;
