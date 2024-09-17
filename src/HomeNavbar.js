import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Business";
import BuildIcon from "@mui/icons-material/Build";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const CarCare_Icon_URL =
  "https://img.freepik.com/free-vector/car-service-logo-design_23-2149750690.jpg";

const solidColorStyle = {
  backgroundColor: "#03045e", // Solid color instead of gradient
};

const menuItemStyle = {
  color: "white",
  fontSize: "12px",
  padding: "8px 12px",
};

const buttonStyle = {
  fontFamily: "Verdana",
  fontWeight: "bold",
  fontStyle: "italic",
  fontSize: "12px",
  color: "white",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontSize: "24px",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "2px",
  flexGrow: 1,
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "40%",
  width: "80px",
  height: "80px",
  overflow: "hidden",
  marginRight: "8px",
  backgroundColor: "#fff",
};

const logoImageStyle = {
  width: "140%",
  height: "140%",
  objectFit: "cover",
};

const menuContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const HomeNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElWarehouse, setAnchorElWarehouse] = React.useState(null);
  const [anchorElServiceCenter, setAnchorElServiceCenter] = React.useState(null);
  const [anchorElCarServices, setAnchorElCarServices] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleWarehouseMenuOpen = (event) => setAnchorElWarehouse(event.currentTarget);
  const handleWarehouseMenuClose = () => setAnchorElWarehouse(null);
  const handleServiceCenterMenuOpen = (event) => setAnchorElServiceCenter(event.currentTarget);
  const handleServiceCenterMenuClose = () => setAnchorElServiceCenter(null);
  const handleCarServicesMenuOpen = (event) => setAnchorElCarServices(event.currentTarget);
  const handleCarServicesMenuClose = () => setAnchorElCarServices(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        ...solidColorStyle,
        height: "80px",
      }}
    >
      <Container>
        <Toolbar sx={{ height: "100%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={logoStyle}
          >
            <div style={logoContainerStyle}>
              <img
                src={CarCare_Icon_URL}
                alt="CarCare Hub"
                style={logoImageStyle}
              />
            </div>
            AutoCare Hub
          </Typography>
          <div style={menuContainerStyle}>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{ fontSize: "30px" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                  }}
                >
                  <MenuItem onClick={handleWarehouseMenuOpen} sx={menuItemStyle}>
                    <Button
                      startIcon={<WarehouseIcon sx={{ fontSize: "16px", color: "white" }} />}
                      sx={buttonStyle}
                    >
                      Warehouse
                    </Button>
                  </MenuItem>
                  <Menu
                    anchorEl={anchorElWarehouse}
                    open={Boolean(anchorElWarehouse)}
                    onClose={handleWarehouseMenuClose}
                    PaperProps={{
                      sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                    }}
                  >
                    <MenuItem onClick={handleWarehouseMenuClose} sx={menuItemStyle}>
                      <Link
                        to="/superadmin-login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                          sx={buttonStyle}
                        >
                          Login
                        </Button>
                      </Link>
                    </MenuItem>
                  </Menu>
                  <MenuItem onClick={handleServiceCenterMenuOpen} sx={menuItemStyle}>
                    <Button
                      startIcon={<BuildIcon sx={{ fontSize: "16px", color: "white" }} />}
                      sx={buttonStyle}
                    >
                      Service Center
                    </Button>
                  </MenuItem>
                  <Menu
                    anchorEl={anchorElServiceCenter}
                    open={Boolean(anchorElServiceCenter)}
                    onClose={handleServiceCenterMenuClose}
                    PaperProps={{
                      sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                    }}
                  >
                    <MenuItem onClick={handleServiceCenterMenuClose} sx={menuItemStyle}>
                      <Link
                        to="/admin-register"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          startIcon={<PersonAddIcon sx={{ fontSize: "16px", color: "white" }} />}
                          sx={buttonStyle}
                        >
                          Register
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleServiceCenterMenuClose} sx={menuItemStyle}>
                      <Link
                        to="/admin-login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                          sx={buttonStyle}
                        >
                          Login
                        </Button>
                      </Link>
                    </MenuItem>
                  </Menu>
                  <MenuItem onClick={handleCarServicesMenuOpen} sx={menuItemStyle}>
                    <Button
                      startIcon={<CarRepairIcon sx={{ fontSize: "16px", color: "white" }} />}
                      sx={buttonStyle}
                    >
                      Car Services
                    </Button>
                  </MenuItem>
                  <Menu
                    anchorEl={anchorElCarServices}
                    open={Boolean(anchorElCarServices)}
                    onClose={handleCarServicesMenuClose}
                    PaperProps={{
                      sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                    }}
                  >
                    <MenuItem onClick={handleCarServicesMenuClose} sx={menuItemStyle}>
                      <Link
                        to="/customer-register"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          startIcon={<PersonAddIcon sx={{ fontSize: "16px", color: "white" }} />}
                          sx={buttonStyle}
                        >
                          Register
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCarServicesMenuClose} sx={menuItemStyle}>
                      <Link
                        to="/customer-login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                          sx={buttonStyle}
                        >
                          Login
                        </Button>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon sx={{ fontSize: "24px", color: "white" }} />}
                  sx={{ fontSize: "16px" }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={handleWarehouseMenuOpen}
                  startIcon={<WarehouseIcon sx={{ fontSize: "24px", color: "white" }} />}
                  sx={{ fontSize: "16px" }}
                >
                  Warehouse
                </Button>
                <Menu
                  anchorEl={anchorElWarehouse}
                  open={Boolean(anchorElWarehouse)}
                  onClose={handleWarehouseMenuClose}
                  PaperProps={{
                    sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                  }}
                >
                  <MenuItem onClick={handleWarehouseMenuClose} sx={menuItemStyle}>
                    <Link
                      to="/superadmin-login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                        sx={buttonStyle}
                      >
                        Login
                      </Button>
                    </Link>
                  </MenuItem>
                </Menu>
                <Button
                  color="inherit"
                  onClick={handleServiceCenterMenuOpen}
                  startIcon={<BuildIcon sx={{ fontSize: "24px", color: "white" }} />}
                  sx={{ fontSize: "16px" }}
                >
                  Service Center
                </Button>
                <Menu
                  anchorEl={anchorElServiceCenter}
                  open={Boolean(anchorElServiceCenter)}
                  onClose={handleServiceCenterMenuClose}
                  PaperProps={{
                    sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                  }}
                >
                  <MenuItem onClick={handleServiceCenterMenuClose} sx={menuItemStyle}>
                    <Link
                      to="/admin-register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<PersonAddIcon sx={{ fontSize: "16px", color: "white" }} />}
                        sx={buttonStyle}
                      >
                        Register
                        </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleServiceCenterMenuClose} sx={menuItemStyle}>
                    <Link
                      to="/admin-login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                        sx={buttonStyle}
                      >
                        Login
                        </Button>
                    </Link>
                  </MenuItem>
                </Menu>
                <Button
                  color="inherit"
                  onClick={handleCarServicesMenuOpen}
                  startIcon={<CarRepairIcon sx={{ fontSize: "24px", color: "white" }} />}
                  sx={{ fontSize: "16px" }}
                >
                  Car Services
                </Button>
                <Menu
                  anchorEl={anchorElCarServices}
                  open={Boolean(anchorElCarServices)}
                  onClose={handleCarServicesMenuClose}
                  PaperProps={{
                    sx: { ...solidColorStyle, padding: "8px" }, // Apply solid color here as well
                  }}
                >
                  <MenuItem onClick={handleCarServicesMenuClose} sx={menuItemStyle}>
                    <Link
                      to="/customer-register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<PersonAddIcon sx={{ fontSize: "16px", color: "white" }} />}
                        sx={buttonStyle}
                      >
                        Register
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCarServicesMenuClose} sx={menuItemStyle}>
                    <Link
                      to="/customer-login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Button
                        startIcon={<LoginIcon sx={{ fontSize: "16px", color: "white" }} />}
                        sx={buttonStyle}
                      >
                        Login
                      </Button>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavbar;
