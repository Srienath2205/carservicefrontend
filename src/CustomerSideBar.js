import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Home,
  ExpandMore,
  ExpandLess,
  ExitToApp,
  CarRepair,
  ArrowBack,
  Book,
  Person,
  Build,
  History,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    background: "linear-gradient(45deg, #C33764, #1D2671)",
    color: "#fff",
  },
}));

const Title = styled("div")(({ theme }) => ({
  textAlign: "center",
  margin: "20px 0",
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  color: "#fff",
}));

const RightArrow = styled(ExpandMore)(({ theme }) => ({
  transition: "transform 0.3s",
}));

const SidebarContent = styled("div")(({ theme }) => ({
  flex: 1,
}));

const CustomerSidebar = ({ open, handleDrawerClose }) => {
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [openMenuServices, setOpenMenuServices] = useState(false);
  const [anchorElTrackStatus, setAnchorElTrackStatus] = useState(null);
  const [openMenuTrackStatus, setOpenMenuTrackStatus] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const navigate = useNavigate();

  const handleClickServices = (event) => {
    setAnchorElServices(event.currentTarget);
    setOpenMenuServices(!openMenuServices);
  };

  const handleCloseServices = () => {
    setAnchorElServices(null);
    setOpenMenuServices(false);
  };

  const handleClickTrackStatus = (event) => {
    setAnchorElTrackStatus(event.currentTarget);
    setOpenMenuTrackStatus(!openMenuTrackStatus);
  };

  const handleCloseTrackStatus = () => {
    setAnchorElTrackStatus(null);
    setOpenMenuTrackStatus(false);
  };

  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
    setOpenMenuProfile(!openMenuProfile);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
    setOpenMenuProfile(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/customer-login");
  };

  return (
    <Sidebar variant="persistent" anchor="left" open={open}>
      <SidebarContent>
        <List>
          {/* Back Arrow */}
          <ListItem button onClick={() => navigate("/customer-dashboard")}>
            <ListItemIcon>
              <ArrowBack sx={{ color: "#fff" }} />
            </ListItemIcon>
          </ListItem>

          {/* Sidebar Title */}
          <Title>
            <span>Services</span>
          </Title>

          {/* Dashboard Link */}
          <ListItemStyled button component={Link} to="/customer-dashboard">
            <ListItemIcon>
              <Home sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemTextStyled primary="Dashboard" />
          </ListItemStyled>

          {/* Vehicles Link */}
          <ListItemStyled button component={Link} to="/view-vehicle">
            <ListItemIcon>
              <CarRepair sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemTextStyled primary="Vehicles" />
          </ListItemStyled>

          {/* Car Services Menu */}
          <ListItemStyled button onClick={handleClickServices}>
            <ListItemIcon>
              <Build sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemTextStyled primary="Car Services" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuServices ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElServices}
            open={openMenuServices}
            onClose={handleCloseServices}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/service-centers"
              onClick={handleCloseServices}
            >
              <ListItemIcon>
                <Build sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemTextStyled primary="Service Centers" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/service-history"
              onClick={handleCloseServices}
            >
              <ListItemIcon>
                <History sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemTextStyled primary="Service History" />
            </MenuItem>
          </Menu>

          {/* Track Status Menu */}
          <ListItemStyled button onClick={handleClickTrackStatus}>
            <ListItemIcon>
              <Book sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemTextStyled primary="Track Status" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuTrackStatus ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElTrackStatus}
            open={openMenuTrackStatus}
            onClose={handleCloseTrackStatus}
            PaperProps={{
              style: {
                width: 200,
                background: "linear-gradient(45deg, #C33764, #1D2671)",
                color: "#fff",
                marginLeft: drawerWidth,
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/track-appointment"
              onClick={handleCloseTrackStatus}
            >
              <ListItemIcon>
                <Book sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemTextStyled primary="Track Appointment" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/track-service"
              onClick={handleCloseTrackStatus}
            >
              <ListItemIcon>
                <Book sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemTextStyled primary="Track Service" />
            </MenuItem>
          </Menu>
        </List>
      </SidebarContent>

      {/* Logout Button at the Bottom */}
      <Divider />
      {/* Profile Menu */}
      <ListItemStyled button onClick={handleClickProfile}>
        <ListItemIcon>
          <Person sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemTextStyled primary="Profile" />
        <RightArrow
          sx={{
            color: "#fff",
            transform: openMenuProfile ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </ListItemStyled>
      <Menu
        anchorEl={anchorElProfile}
        open={openMenuProfile}
        onClose={handleCloseProfile}
        PaperProps={{
          style: {
            width: 200,
            background: "linear-gradient(45deg, #C33764, #1D2671)",
            color: "#fff",
            marginLeft: drawerWidth,
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          component={Link}
          to="/view-profile"
          onClick={handleCloseProfile}
        >
          <ListItemIcon>
            <Person sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemTextStyled primary="View Profile" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/edit-profile"
          onClick={handleCloseProfile}
        >
          <ListItemIcon>
            <Person sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemTextStyled primary="Edit Profile" />
        </MenuItem>
      </Menu>

      {/* Logout Button */}
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemTextStyled primary="Log Out" />
        </ListItem>
      </List>
    </Sidebar>
  );
};

export default CustomerSidebar;
