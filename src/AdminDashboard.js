// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Avatar,
//   Button,
//   Modal,
//   Box,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   AccountCircle,
//   Dashboard,
//   People,
//   ExitToApp,
//   Visibility,
//   Download,
//   PictureAsPdf,
// } from "@mui/icons-material";
// import Slider from "react-slick";
// import { Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend,
//   Title,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import axios from "axios";
// import AdminSidebar from "./AdminSidebar";

// import developer1 from "./ds1.jpg";
// import developer2 from "./ds2.jpg";
// import developer3 from "./ds3.jpg";
// import developer4 from "./ds4.jpg";
// import developer5 from "./ds5.jpg";
// import developer6 from "./ds6.jpg";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend,
//   Title,
//   ArcElement,
//   CategoryScale,
//   LinearScale
// );

// const GradientButton = styled(Button)(({ theme }) => ({
//   background: "linear-gradient(45deg, #C33764 30%, #1D2671 90%)",
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//   color: "white",
//   height: 40,
//   padding: "0 20px",
//   fontSize: "20px",
//   fontStyle: "italic",
//   textTransform: "none",
//   "&:hover": {
//     background: "linear-gradient(45deg, #1D2671 30%, #C33764 90%)",
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginLeft: theme.spacing(2),
//   backgroundColor: "#009688",
//   color: "white",
//   "&:hover": {
//     backgroundColor: "#00796b",
//   },
// }));

// const CenteredBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100%",
// }));

// const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   fontWeight: "bold",
//   backgroundColor: "#03045e",
//   color: "white",
// }));

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const drawerWidth = 240;

// const SampleNextArrow = styled("div")({
//   display: "block",
//   width: "30px",
//   height: "30px",
//   background: "#03045e",
//   color: "white",
//   borderRadius: "50%",
//   lineHeight: "30px",
//   textAlign: "center",
//   cursor: "pointer",
//   position: "absolute",
//   top: "50%",
//   right: "10px",
//   transform: "translateY(-50%)",
//   "&::before": {
//     content: '"→"',
//     fontSize: "16px",
//   },
// });

// const SamplePrevArrow = styled("div")({
//   display: "block",
//   width: "30px",
//   height: "30px",
//   background: "#03045e",
//   color: "white",
//   borderRadius: "50%",
//   lineHeight: "30px",
//   textAlign: "center",
//   cursor: "pointer",
//   position: "absolute",
//   top: "50%",
//   left: "10px",
//   transform: "translateY(-50%)",
//   "&::before": {
//     content: '"←"',
//     fontSize: "16px",
//   },
// });

// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// const serviceAppointmentsChartData = {
//   labels: ["Pending", "Approved", "Completed", "Canceled"],
//   datasets: [
//     {
//       label: "Service Appointments",
//       data: [12, 5, 8, 3],
//       backgroundColor: ["#C33764", "#1D2671", "#FF9800", "#4CAF50"],
//     },
//   ],
// };

// const serviceHistoryLineChartData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Completed Services",
//       data: [10, 20, 15, 25, 30, 20],
//       borderColor: "#1D2671",
//       backgroundColor: "rgba(29, 38, 113, 0.2)",
//     },
//   ],
// };

// const developers = [
//   { name: "Shinobu", role: "Frontend Developer", image: developer1 },
//   { name: "Nezuko", role: "Backend Developer", image: developer2 },
//   { name: "Inosuke", role: "Tester", image: developer3 },
//   { name: "Zenitsu", role: "UX Designer", image: developer4 },
//   { name: "Tanjiro", role: "Product Manager", image: developer5 },
//   { name: "Giyu", role: "DevOps Engineer", image: developer6 },
// ];

// const AdminDashboard = () => {
//   const [open, setOpen] = useState(true);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [serviceCenterDetails, setServiceCenterDetails] = useState(null);
//   const [selectedCenter, setSelectedCenter] = useState(null);
//   const [showRegisterButton, setShowRegisterButton] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [fileUrls, setFileUrls] = useState({});
//   const [viewFile, setViewFile] = useState(null);

//   const navigate = useNavigate();
//   const adminID = sessionStorage.getItem("adminID");

//   useEffect(() => {
//     const fetchServiceCenterDetails = async () => {
//       const adminID = sessionStorage.getItem("adminID");
//       if (adminID) {
//         try {
//           const response = await axios.get(
//             "http://localhost:8686/servicecenters/all",
//             {
//               params: { adminID },
//             }
//           );
//           const data = response.data;
//           if (data && data.length > 0) {
//             const serviceCenter = data[0];
//             setServiceCenterDetails(serviceCenter);
//             setShowRegisterButton(serviceCenter.status !== "Approved");
//           }
//         } catch (error) {
//           console.error("Error fetching service center details", error);
//         }
//       }
//     };

//     fetchServiceCenterDetails();
//   }, []);

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setProfileMenuOpen(!profileMenuOpen);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//     setProfileMenuOpen(false);
//   };

//   const handleProfileMenuItemClick = (path) => {
//     navigate(path);
//     handleProfileMenuClose();
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/admin-login");
//   };

//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   const handleView = (url, type) => {
//     setViewFile({ url, type });
//   };

//   const handleDownload = (url, fileName) => {
//     // Add download functionality
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = fileName;
//     link.click();
//   };

//   return (
//     <div style={{ display: "flex", position: "relative", height: "100vh" }}>
//       <AdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />

//       <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
//         {/* Title Section */}
//         <div
//           style={{
//             color: "#03045e",
//             padding: "10px 20px",
//             marginBottom: "20px",
//             textAlign: "center",
//             fontSize: "24px",
//             fontWeight: "bold",
//           }}
//         >
//           <Dashboard style={{ verticalAlign: "middle", marginRight: "8px" }} />
//           Admin Dashboard
//         </div>

//         <Container style={{ paddingTop: "30px" }}>
//           <Grid container spacing={3}>
//             {/* Register Service Center Button */}
//             <Grid item xs={12}>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 {showRegisterButton && (
//                   <GradientButton
//                     onClick={() => navigate("/register-service-center")}
//                   >
//                     Register Service Center
//                   </GradientButton>
//                 )}
//                 <GradientButton
//                   onClick={() => navigate("/view-servicecenterstatus")}
//                 >
//                   Center Status
//                 </GradientButton>
//               </div>
//             </Grid>

//             {/* Service Appointments Pie Chart */}
//             <Grid item xs={12} md={6}>
//               <Card style={{ marginBottom: "20px" }}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     style={{
//                       fontWeight: "bold",
//                       color: "#03045e",
//                       textAlign: "center",
//                     }}
//                   >
//                     <People
//                       style={{ verticalAlign: "middle", marginRight: "8px" }}
//                     />
//                     Service Appointments
//                   </Typography>
//                   <div style={{ height: "250px" }}>
//                     <Pie data={serviceAppointmentsChartData} />
//                   </div>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Completed Services Line Chart */}
//             <Grid item xs={12} md={6}>
//               <Card style={{ marginBottom: "20px" }}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     style={{
//                       fontWeight: "bold",
//                       color: "#03045e",
//                       textAlign: "center",
//                     }}
//                   >
//                     <Dashboard
//                       style={{ verticalAlign: "middle", marginRight: "8px" }}
//                     />
//                     Service History
//                   </Typography>
//                   <Line data={serviceHistoryLineChartData} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>

//         <Container>
//           <div className="text-block">
//             <center>
//               <h1
//                 style={{
//                   marginTop: "50px",
//                   fontSize: "25px",
//                   fontFamily: "verdana",
//                   fontWeight: "bold",
//                   fontStyle: "italic",
//                   color: "#03045e",
//                 }}
//               >
//                 Admin Home
//               </h1>
//             </center>
//             <br />
//             <center>
//               <p
//                 style={{
//                   fontSize: "25px",
//                   fontStyle: "italic",
//                   textDecoration: "none",
//                   color: "#03045e",
//                 }}
//               >
//                 Welcome to the admin panel.
//               </p>
//             </center>
//             <center>
//               <p
//                 style={{
//                   fontSize: "25px",
//                   fontStyle: "italic",
//                   textDecoration: "none",
//                   color: "#03045e",
//                 }}
//               >
//                 Manage your service center, approve & track appointments, and
//                 view service history.
//               </p>
//             </center>
//             <center>
//               <GradientButton
//                 component={Link}
//                 to="/view-inventory"
//                 style={{ margin: "10px" }}
//               >
//                 View Inventory
//               </GradientButton>
//               <GradientButton
//                 component={Link}
//                 to="/view-technicians"
//                 style={{ margin: "10px" }}
//               >
//                 View Technicians
//               </GradientButton>
//               <GradientButton
//                 component={Link}
//                 to="/view-customers"
//                 style={{ margin: "10px" }}
//               >
//                 View Customers
//               </GradientButton>
//             </center>
//           </div>

//           {/* Developer Slider */}
//           <Grid container spacing={3} style={{ marginTop: "40px" }}>
//             <Grid item xs={12}>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 style={{
//                   marginBottom: "10px",
//                   fontWeight: "bold",
//                   color: "#03045e",
//                   textAlign: "center",
//                 }}
//               >
//                 <People
//                   style={{ verticalAlign: "middle", marginRight: "8px" }}
//                 />
//                 Meet the Team
//               </Typography>
//               <Slider {...sliderSettings} className="team-slider">
//                 {developers.map((developer, index) => (
//                   <div key={index} style={{ textAlign: "center" }}>
//                     <Avatar
//                       src={developer.image}
//                       alt={developer.name}
//                       style={{ width: 100, height: 100, margin: "0 auto" }}
//                     />
//                     <Typography
//                       variant="body1"
//                       component="div"
//                       style={{
//                         marginTop: "10px",
//                         fontWeight: "bold",
//                         color: "#03045e",
//                       }}
//                     >
//                       {developer.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       component="div"
//                       style={{ color: "#03045e" }}
//                     >
//                       {developer.role}
//                     </Typography>
//                   </div>
//                 ))}
//               </Slider>
//             </Grid>
//           </Grid>
//         </Container>

//         {/* Profile Icon Badge */}
//         <div style={{ position: "fixed", top: 20, right: 20 }}>
//           <IconButton onClick={handleProfileClick}>
//             <Avatar>
//               <AccountCircle />
//             </Avatar>
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={profileMenuOpen}
//             onClose={handleProfileMenuClose}
//           >
//             <MenuItem
//               onClick={() => handleProfileMenuItemClick("/admin-profile")}
//             >
//               <AccountCircle style={{ marginRight: "10px" }} />
//               View Profile
//             </MenuItem>
//             <MenuItem
//               onClick={() => handleProfileMenuItemClick("/edit-admin-profile")}
//             >
//               <AccountCircle style={{ marginRight: "10px" }} />
//               Edit Profile
//             </MenuItem>
//             {serviceCenterDetails &&
//           serviceCenterDetails.status === "Approved" &&
//           serviceCenterDetails.admin.adminID == adminID && (
//             <MenuItem onClick={handleOpenModal}>
//               <Visibility style={{ marginRight: "10px" }} />
//               Center Details
//             </MenuItem>
//           )}
//             <MenuItem onClick={handleLogout}>
//               <ExitToApp style={{ marginRight: "10px" }} />
//               Logout
//             </MenuItem>
//           </Menu>
//         </div>

//         {/* Center Details Modal */}
//         <Modal open={modalOpen} onClose={handleCloseModal}>
//           <Box
//             sx={{
//               width: 400,
//               padding: 4,
//               margin: "auto",
//               backgroundColor: "white",
//               borderRadius: "8px",
//               boxShadow: 24,
//             }}
//           >
//             <Typography variant="h6">Center Details</Typography>
//             {serviceCenterDetails ? (
//               <Box>
//                 <Typography variant="body1">
//                   <strong>Service Center Name:</strong>{" "}
//                   {serviceCenterDetails.serviceCenterName}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Address:</strong> {serviceCenterDetails.address}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Phone Number:</strong>{" "}
//                   {serviceCenterDetails.phoneNumber}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Email:</strong> {serviceCenterDetails.email}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Location:</strong> {serviceCenterDetails.location}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Description:</strong>{" "}
//                   {serviceCenterDetails.description}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Status:</strong> {serviceCenterDetails.status}
//                 </Typography>
//               </Box>
//             ) : (
//               <Typography>Loading...</Typography>
//             )}
//             <DialogActions>
//               <Button onClick={handleCloseModal} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Box>
//         </Modal>
//       </Main>

//       {/* Custom styles for slider arrows and dots */}
//       <style>
//         {`
//           .team-slider .slick-prev, .team-slider .slick-next {
//             color: #03045e; /* Arrow color */
//           }
//           .team-slider .slick-dots li button:before {
//             color: #03045e; /* Default dot color */
//           }
//           .team-slider .slick-dots li.slick-active button:before {
//             color: #03045e; /* Active dot color */
//           }
//           .team-slider .slick-dots li button:hover:before {
//             color: #03045e; /* Hover dot color */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Modal,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Dashboard,
  People,
  ExitToApp,
  Visibility,
  Download,
  PictureAsPdf,
} from "@mui/icons-material";
import Slider from "react-slick";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

import developer1 from "./ds1.jpg";
import developer2 from "./ds2.jpg";
import developer3 from "./ds3.jpg";
import developer4 from "./ds4.jpg";
import developer5 from "./ds5.jpg";
import developer6 from "./ds6.jpg";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale
);

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #C33764 30%, #1D2671 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 40,
  padding: "0 20px",
  fontSize: "20px",
  fontStyle: "italic",
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(45deg, #1D2671 30%, #C33764 90%)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: "#009688",
  color: "white",
  "&:hover": {
    backgroundColor: "#00796b",
  },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  backgroundColor: "#03045e",
  color: "white",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const drawerWidth = 240;

const SampleNextArrow = styled("div")({
  display: "block",
  width: "30px",
  height: "30px",
  background: "#03045e",
  color: "white",
  borderRadius: "50%",
  lineHeight: "30px",
  textAlign: "center",
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  "&::before": {
    content: '"→"',
    fontSize: "16px",
  },
});

const SamplePrevArrow = styled("div")({
  display: "block",
  width: "30px",
  height: "30px",
  background: "#03045e",
  color: "white",
  borderRadius: "50%",
  lineHeight: "30px",
  textAlign: "center",
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  "&::before": {
    content: '"←"',
    fontSize: "16px",
  },
});

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const serviceAppointmentsChartData = {
  labels: ["Pending", "Approved", "Completed", "Canceled"],
  datasets: [
    {
      label: "Service Appointments",
      data: [12, 5, 8, 3],
      backgroundColor: ["#C33764", "#1D2671", "#FF9800", "#4CAF50"],
    },
  ],
};

const serviceHistoryLineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Completed Services",
      data: [10, 20, 15, 25, 30, 20],
      borderColor: "#1D2671",
      backgroundColor: "rgba(29, 38, 113, 0.2)",
    },
  ],
};

const developers = [
  { name: "Shinobu", role: "Frontend Developer", image: developer1 },
  { name: "Nezuko", role: "Backend Developer", image: developer2 },
  { name: "Inosuke", role: "Tester", image: developer3 },
  { name: "Zenitsu", role: "UX Designer", image: developer4 },
  { name: "Tanjiro", role: "Product Manager", image: developer5 },
  { name: "Giyu", role: "DevOps Engineer", image: developer6 },
];

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [serviceCenterDetails, setServiceCenterDetails] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  
  const [viewFile, setViewFile] = useState(null);

  const navigate = useNavigate();
  const adminID = sessionStorage.getItem("adminID");

  useEffect(() => {
    const fetchServiceCenterDetails = async () => {
      const adminID = sessionStorage.getItem("adminID");
      if (adminID) {
        try {
          const response = await axios.get(
            "http://localhost:8686/servicecenters/all",
            {
              params: { adminID },
            }
          );
          const data = response.data;
          if (data && data.length > 0) {
            const serviceCenter = data[0];
            setServiceCenterDetails(serviceCenter);
          } 
        } catch (error) {
          console.error("Error fetching service center details", error);
        }
      }
    };
  
    fetchServiceCenterDetails();
  }, []);
  
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
  };

  const handleProfileMenuItemClick = (path) => {
    navigate(path);
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/admin-login");
  };

  const handleView = (url, type) => {
    setViewFile({ url, type });
  };

  const handleDownload = (url, fileName) => {
    // Add download functionality
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <div style={{ display: "flex", position: "relative", height: "100vh" }}>
      <AdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />

      <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
        {/* Title Section */}
        <div
          style={{
            color: "#03045e",
            padding: "10px 20px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <Dashboard style={{ verticalAlign: "middle", marginRight: "8px" }} />
          Admin Dashboard
        </div>

        <Container style={{ paddingTop: "30px" }}>
          <Grid container spacing={3}>
            {/* Register Service Center Button */}
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {showRegisterButton && (
                  <GradientButton
                    onClick={() => navigate("/register-service-center")}
                  >
                    Register Service Center
                  </GradientButton>
                )}
                <GradientButton
                  onClick={() => navigate("/view-servicecenterstatus")}
                >
                  Center Status
                </GradientButton>
              </div>
            </Grid>

            {/* Service Appointments Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e",
                      textAlign: "center",
                    }}
                  >
                    <People
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    Service Appointments
                  </Typography>
                  <div style={{ height: "250px" }}>
                    <Pie data={serviceAppointmentsChartData} />
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Completed Services Line Chart */}
            <Grid item xs={12} md={6}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e",
                      textAlign: "center",
                    }}
                  >
                    <Dashboard
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    Service History
                  </Typography>
                  <Line data={serviceHistoryLineChartData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <div className="text-block">
            <center>
              <h1
                style={{
                  marginTop: "50px",
                  fontSize: "25px",
                  fontFamily: "verdana",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "#03045e",
                }}
              >
                Admin Home
              </h1>
            </center>
            <br />
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#03045e",
                }}
              >
                Welcome to the admin panel.
              </p>
            </center>
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#03045e",
                }}
              >
                Manage your service center, approve & track appointments, and
                view service history.
              </p>
            </center>
            <center>
              <GradientButton
                component={Link}
                to="/view-inventory"
                style={{ margin: "10px" }}
              >
                View Inventory
              </GradientButton>
              <GradientButton
                component={Link}
                to="/view-technicians"
                style={{ margin: "10px" }}
              >
                View Technicians
              </GradientButton>
              <GradientButton
                component={Link}
                to="/view-customers"
                style={{ margin: "10px" }}
              >
                View Customers
              </GradientButton>
            </center>
          </div>

          {/* Developer Slider */}
          <Grid container spacing={3} style={{ marginTop: "40px" }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#03045e",
                  textAlign: "center",
                }}
              >
                <People
                  style={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                Meet the Team
              </Typography>
              <Slider {...sliderSettings} className="team-slider">
                {developers.map((developer, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <Avatar
                      src={developer.image}
                      alt={developer.name}
                      style={{ width: 100, height: 100, margin: "0 auto" }}
                    />
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        color: "#03045e",
                      }}
                    >
                      {developer.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      style={{ color: "#03045e" }}
                    >
                      {developer.role}
                    </Typography>
                  </div>
                ))}
              </Slider>
            </Grid>
          </Grid>
        </Container>

        {/* Profile Icon Badge */}
        <div style={{ position: "fixed", top: 20, right: 20 }}>
          <IconButton onClick={handleProfileClick}>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
          >
            <MenuItem
              onClick={() => handleProfileMenuItemClick("/admin-profile")}
            >
              <AccountCircle style={{ marginRight: "10px" }} />
              View Profile
            </MenuItem>
            <MenuItem
              onClick={() => handleProfileMenuItemClick("/edit-admin-profile")}
            >
              <AccountCircle style={{ marginRight: "10px" }} />
              Edit Profile
            </MenuItem>
            
            <MenuItem onClick={handleLogout}>
              <ExitToApp style={{ marginRight: "10px" }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Main>

      {/* Custom styles for slider arrows and dots */}
      <style>
        {`
          .team-slider .slick-prev, .team-slider .slick-next {
            color: #03045e; /* Arrow color */
          }
          .team-slider .slick-dots li button:before {
            color: #03045e; /* Default dot color */
          }
          .team-slider .slick-dots li.slick-active button:before {
            color: #03045e; /* Active dot color */
          }
          .team-slider .slick-dots li button:hover:before {
            color: #03045e; /* Hover dot color */
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;

