import React, { useState } from "react";
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
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Dashboard,
  Store,
  People,
  AddShoppingCart,
  ExitToApp,
} from "@mui/icons-material";
import Slider from "react-slick";
import { Bar, Pie } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import developer1 from "./ds1.jpg";
import developer2 from "./ds2.jpg";
import developer3 from "./ds3.jpg";
import developer4 from "./ds4.jpg";
import developer5 from "./ds5.jpg";
import developer6 from "./ds6.jpg";
import SuperAdminSidebar from "./SuperAdminSidebar";

// Styled components
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

// Define custom arrow components
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

// Sample data for the charts
const inventoryRequestsData = {
  labels: ["Pending", "Processed"],
  datasets: [
    {
      label: "Inventory Requests",
      data: [6, 12],
      backgroundColor: ["#FF5722", "#4CAF50"],
    },
  ],
};

const inventoryPartsData = {
  labels: ["Brake Pads", "Oil Filters", "Air Filters", "Spark Plugs"],
  datasets: [
    {
      label: "Inventory Parts and Quantity",
      data: [150, 80, 120, 90],
      backgroundColor: ["#FFC107", "#FF5722", "#4CAF50", "#03A9F4"],
    },
  ],
};

const serviceCenterRegistrationsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Service Center Registrations",
      data: [5, 8, 6, 7, 10, 9],
      backgroundColor: "#03A9F4",
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

const SuperAdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    navigate("/superadmin-login");
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        height: "140vh",
      }}
    >
      <SuperAdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />

      <Main open={open} style={{ flexGrow: 1, padding: "20px" }}>
        {/* Title Section */}
        <div
          style={{
            color: "#03045e", // Updated text color
            padding: "10px 20px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <Dashboard style={{ verticalAlign: "middle", marginRight: "8px" }} />
          SuperAdmin Dashboard
        </div>

        <Container style={{ paddingTop: "30px" }}>
          <Grid container spacing={3}>
            {/* Inventory Requests Pie Chart */}
            <Grid item xs={12} md={4}>
              <Card style={{ marginBottom: "20px", backgroundColor: "#fff" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e", // Updated text color
                      textAlign: "center",
                    }}
                  >
                    <AddShoppingCart
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    Inventory Requests
                  </Typography>
                  <div style={{ height: "250px" }}>
                    <Pie data={inventoryRequestsData} />
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Inventory Parts and Quantity Bar Chart */}
            <Grid item xs={12} md={4}>
              <Card style={{ marginBottom: "20px", backgroundColor: "#fff" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e", // Updated text color
                      textAlign: "center",
                    }}
                  >
                    <Store
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    Inventory Parts and Quantity
                  </Typography>
                  <div style={{ height: "250px" }}>
                    <Bar data={inventoryPartsData} />
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Service Center Registrations Chart */}
            <Grid item xs={12} md={4}>
              <Card style={{ marginBottom: "20px", backgroundColor: "#fff" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      color: "#03045e", // Updated text color
                      textAlign: "center",
                    }}
                  >
                    <Dashboard
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    Service Center Registrations
                  </Typography>
                  <div style={{ height: "250px" }}>
                    <Bar data={serviceCenterRegistrationsData} />
                  </div>
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
                  color: "#03045e", // Updated text color
                }}
              >
                Super Admin Home
              </h1>
            </center>
            <br />
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#03045e", // Updated text color
                }}
              >
                Welcome to the WareHouse panel.
              </p>
            </center>
            <center>
              <p
                style={{
                  fontSize: "25px",
                  fontStyle: "italic",
                  textDecoration: "none",
                  color: "#03045e", // Updated text color
                }}
              >
                Manage service centers, track appointments, and view service
                history.
              </p>
            </center>
            <center>
              <GradientButton
                component={Link}
                to="/view-inventory"
                style={{ margin: "10px" }}
              >
                Inventory
              </GradientButton>
              <GradientButton
                component={Link}
                to="/superadmin-viewcenters"
                style={{ margin: "10px" }}
              >
                ServiceCenters
              </GradientButton>
              <GradientButton
                component={Link}
                to="/view-restock"
                style={{ margin: "10px" }}
              >
                Restock
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
                <People style={{ verticalAlign: "middle", marginRight: "8px" }} />
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
              onClick={() => handleProfileMenuItemClick("/superadmin-profile")}
              style={{ color: "#fff" }}
            >
              <AccountCircle style={{ marginRight: "10px" }} />
              View Profile
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleProfileMenuItemClick("/edit-superadminprofile")
              }
              style={{ color: "#fff" }}
            >
              <AccountCircle style={{ marginRight: "10px" }} />
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} style={{ color: "#fff" }}>
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

export default SuperAdminDashboard;
