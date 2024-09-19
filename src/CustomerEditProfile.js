// import React, { useEffect, useState } from 'react';
// import { Container, Typography, TextField, Button, Alert, Box } from '@mui/material';
// import { Edit as EditIcon } from '@mui/icons-material';
// import axios from 'axios';

// const CustomerEditProfile = () => {
//   const [customer, setCustomer] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [changePasswordVisible, setChangePasswordVisible] = useState(false);
//   const [vehicleID, setVehicleID] = useState('');
//   const customerID = sessionStorage.getItem("customerID");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8686/customer/all');
//         const customers = response.data;
//         const foundCustomer = customers.find(c => c.customerID === parseInt(customerID));
//         setCustomer(foundCustomer);
//         if (foundCustomer && foundCustomer.vehicle) {
//           setVehicleID(foundCustomer.vehicle.vehicleID); // Assuming vehicle structure includes vehicleID
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//       }
//     };

//     fetchCustomerData();
//   }, [customerID]);

//   const handleUpdateProfile = async () => {
//     if (!customer) return;

//     // Prepare the updated fields
//     const updatedCustomer = {
//       name: customer.name,
//       address: customer.address,
//       phoneNumber: customer.phoneNumber,
//       vehicle: {
//         vehicleID: vehicleID, // Include vehicle ID in the update
//       },
//     };

//     // Prepare update data only for changed fields
//     const updateData = {
//       ...(updatedCustomer.name !== customer.name && { name: updatedCustomer.name }),
//       ...(updatedCustomer.address !== customer.address && { address: updatedCustomer.address }),
//       ...(updatedCustomer.phoneNumber !== customer.phoneNumber && { phoneNumber: updatedCustomer.phoneNumber }),
//       ...(vehicleID && { vehicle: { vehicleID } }), // Include vehicle ID if provided
//     };

//     // Update profile information
//     try {
//       await axios.put(`http://localhost:8686/customer/update/${customer.customerID}`, updateData);
//       setMessage("Profile updated successfully.");
//     } catch (error) {
//       console.error("Error updating profile", error);
//       setMessage("Error updating profile.");
//     }
//   };

//   const handleChangePassword = async () => {
//     if (oldPassword === customer.password) {
//       if (newPassword !== confirmPassword) {
//         setMessage("New password and confirm password do not match.");
//         return;
//       }

//       try {
//         await axios.put(`http://localhost:8686/customer/update/${customer.customerID}`, {
//           password: newPassword
//         });
//         setMessage("Password updated successfully.");
//         setChangePasswordVisible(false);
//       } catch (error) {
//         console.error("Error updating password", error);
//         setMessage("Error updating password.");
//       }
//     } else {
//       setMessage("Old password is incorrect.");
//     }
//   };

//   if (!customer) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Edit Profile
//       </Typography>
//       {message && <Alert severity="info">{message}</Alert>}

//       <TextField
//         label="Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={customer.name}
//         onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="Email"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={customer.email}
//         disabled
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="Address"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={customer.address}
//         onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="Phone Number"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={customer.phoneNumber}
//         onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
//         InputLabelProps={{ shrink: true }}
//       />

//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={handleUpdateProfile} 
//         style={{ marginTop: '20px' }}
//       >
//         Update Profile
//       </Button>
//       <br />
//       <Button 
//         variant="outlined" 
//         color="primary" 
//         startIcon={<EditIcon />} 
//         onClick={() => setChangePasswordVisible(!changePasswordVisible)} 
//         style={{ marginTop: '20px' }}
//       >
//         Change Password
//       </Button>

//       {changePasswordVisible && (
//         <Box mt={2}>
//           <TextField
//             label="Old Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="New Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Confirm New Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={handleChangePassword} 
//             style={{ marginTop: '20px' }}
//           >
//             Update Password
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default CustomerEditProfile;
