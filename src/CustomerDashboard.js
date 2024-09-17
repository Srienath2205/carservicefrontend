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
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Dashboard,
  Schedule,
  History,
  Visibility,
  Edit,
  ExitToApp,
  People,
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
import CustomerSidebar from "./CustomerSideBar";
import homebackground from "./homebackground.avif"; // Correct import

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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
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

const developers = [
  { name: "Shinobu", role: "Frontend Developer", image: developer1 },
  { name: "Nezuko", role: "Backend Developer", image: developer2 },
  { name: "Inosuke", role: "Tester", image: developer3 },
  { name: "Zenitsu", role: "UX Designer", image: developer4 },
  { name: "Tanjiro", role: "Product Manager", image: developer5 },
  { name: "Giyu", role: "DevOps Engineer", image: developer6 },
];

const CustomerDashboard = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  //   const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();

  //   const fetchCustomerName = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8787/customer/email"
  //       );
  //       const email = response.data.email;
  //       const name = email.split("@")[0];
  //       setCustomerName(name);
  //     } catch (error) {
  //       console.error("Error fetching customer name:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchCustomerName();
  //   }, []);

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
    navigate("/customer-login");
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        height: "140vh",
        background: `url(${homebackground}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <CustomerSidebar open={open} handleDrawerClose={() => setOpen(false)} />

      <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
        {/* Title Section */}
        <div
          style={{
            color: "#fff",
            padding: "10px 20px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <Dashboard style={{ verticalAlign: "middle", marginRight: "8px" }} />
          Customer Dashboard
        </div>

        <Container style={{ paddingTop: "30px" }}>
          <Grid container spacing={3}>
            {/* Service Appointments Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e", // Changed color to white
                      textAlign: "center",
                    }}
                  >
                    <Schedule
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
                      color: "#03045e", // Changed color to white
                      textAlign: "center",
                    }}
                  >
                    <History
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
                  color: "#fff", // Changed color to white
                }}
              >
                Customer Home
              </h1>
            </center>
            <br />
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#fff", // Changed color to white
                }}
              >
                Welcome to your account.
              </p>
            </center>
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#fff", // Changed color to white
                }}
              >
                Manage your vehicle details, Book appointments, and track
                services.
              </p>
            </center>
            <center>
              <GradientButton
                component={Link}
                to="/add-vehicle"
                style={{ margin: "10px" }}
              >
                Add Vehicle
              </GradientButton>
              <GradientButton
                component={Link}
                to="/book-appointment"
                style={{ margin: "10px" }}
              >
                Book Appointment
              </GradientButton>
              <GradientButton
                component={Link}
                to="/view-reports"
                style={{ margin: "10px" }}
              >
                View Service Reports
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
                  color: "#fff",
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
                        color: "#fff",
                      }}
                    >
                      {developer.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      style={{ color: "#fff" }}
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
        <div
          style={{ position: "fixed", top: 20, right: 20, textAlign: "center" }}
        >
          <IconButton
            onClick={handleProfileClick}
            style={{
              background: "linear-gradient(45deg, #C33764 30%, #1D2671 90%)",
            }}
          >
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
          {/* <Typography
            variant="caption"
            style={{ color: "#fff", marginTop: "5px" }}
          >
            {customerName}
          </Typography> */}
          <Menu
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
            PaperProps={{
              style: {
                width: "200px",
                background: "linear-gradient(45deg, #C33764 30%, #1D2671 90%)",
                color: "white",
              },
            }}
          >
            <MenuItem
              onClick={() => handleProfileMenuItemClick("/cusprofile")}
              style={{ color: "#fff" }}
            >
              <Visibility style={{ marginRight: "10px" }} />
              View Profile
            </MenuItem>
            <MenuItem
              onClick={() => handleProfileMenuItemClick("/edit-cusprofile")}
              style={{ color: "#fff" }}
            >
              <Edit style={{ marginRight: "10px" }} />
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} style={{ color: "#fff" }}>
              <ExitToApp style={{ marginRight: "10px" }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Main>
      {/* Custom styles for slider dots */}
      <style>
        {`
          .team-slider .slick-dots li button:before {
            color: white; /* Default color */
          }
          .team-slider .slick-dots li.slick-active button:before {
            color: white; /* Active dot color */
          }
          .team-slider .slick-dots li button:hover:before {
            color: white; /* Hover color */
          }
        `}
      </style>
    </div>
  );
};

export default CustomerDashboard;
