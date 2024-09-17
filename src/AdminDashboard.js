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
  MenuItem as SelectMenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import {
  AccountCircle,
  Dashboard,
  People,
  ExitToApp,
} from "@mui/icons-material"; // Added Phone here
import Slider from "react-slick";
import { Line, Pie } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import AdminSidebar from "./AdminSidebar";
import homebackground from "./homebackground.avif";
import developer1 from "./ds1.jpg";
import developer2 from "./ds2.jpg";
import developer3 from "./ds3.jpg";
import developer4 from "./ds4.jpg";
import developer5 from "./ds5.jpg";
import developer6 from "./ds6.jpg";

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

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#c62828",
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

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    navigate('/register-service-center');
  };

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
      <AdminSidebar open={open} handleDrawerClose={() => setOpen(false)} />

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
          Admin Dashboard
        </div>

        <Container style={{ paddingTop: "30px" }}>
          <Grid container spacing={3}>
            {/* Register Service Center Button */}
            <Grid item xs={12}>
              <GradientButton onClick={handleDialogOpen}>
                Register Service Center
              </GradientButton>
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
                  color: "#fff", // Changed color to white
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
                Manage your Service Center, Technicians, Provide car services.
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
              onClick={() => handleProfileMenuItemClick("/admin-profile")}
              style={{ color: "#fff" }}
            >
              <AccountCircle style={{ marginRight: "10px" }} />
              View Profile
            </MenuItem>
            <MenuItem
              onClick={() => handleProfileMenuItemClick("/edit-adminprofile")}
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

export default AdminDashboard;
