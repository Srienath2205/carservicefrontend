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
  AddCircle,
  ViewList,
  Add,
  Person,
  Pending,
  CheckCircle,
  Cancel,
  Work,
  History,
  AttachMoney,
  People,
  Store, // Changed icon
  Engineering, // Changed icon
  ArrowBack
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
  fontSize: "1.5rem",  // Increase font size
  fontWeight: "bold",  // Make the text bold
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const RightArrow = styled(ExpandMore)(({ theme }) => ({
  transition: "transform 0.3s",
}));

const SidebarContent = styled("div")(({ theme }) => ({
  flex: 1,
}));

const AdminSidebar = ({ open }) => {
  const [anchorElInventory, setAnchorElInventory] = useState(null);
  const [openMenuInventory, setOpenMenuInventory] = useState(false);
  const [anchorElAppointments, setAnchorElAppointments] = useState(null);
  const [openMenuAppointments, setOpenMenuAppointments] = useState(false);
  const [anchorElServiceJobs, setAnchorElServiceJobs] = useState(null);
  const [openMenuServiceJobs, setOpenMenuServiceJobs] = useState(false);
  const [anchorElCustomer, setAnchorElCustomer] = useState(null);
  const [openMenuCustomer, setOpenMenuCustomer] = useState(false);
  const [anchorElTechnicians, setAnchorElTechnicians] = useState(null);
  const [openMenuTechnicians, setOpenMenuTechnicians] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const navigate = useNavigate();

  const handleClickInventory = (event) => {
    setAnchorElInventory(event.currentTarget);
    setOpenMenuInventory(!openMenuInventory);
  };

  const handleCloseInventory = () => {
    setAnchorElInventory(null);
    setOpenMenuInventory(false);
  };

  const handleClickAppointments = (event) => {
    setAnchorElAppointments(event.currentTarget);
    setOpenMenuAppointments(!openMenuAppointments);
  };

  const handleCloseAppointments = () => {
    setAnchorElAppointments(null);
    setOpenMenuAppointments(false);
  };

  const handleClickServiceJobs = (event) => {
    setAnchorElServiceJobs(event.currentTarget);
    setOpenMenuServiceJobs(!openMenuServiceJobs);
  };

  const handleCloseServiceJobs = () => {
    setAnchorElServiceJobs(null);
    setOpenMenuServiceJobs(false);
  };

  const handleClickCustomer = (event) => {
    setAnchorElCustomer(event.currentTarget);
    setOpenMenuCustomer(!openMenuCustomer);
  };

  const handleCloseCustomer = () => {
    setAnchorElCustomer(null);
    setOpenMenuCustomer(false);
  };

  const handleClickTechnicians = (event) => {
    setAnchorElTechnicians(event.currentTarget);
    setOpenMenuTechnicians(!openMenuTechnicians);
  };

  const handleCloseTechnicians = () => {
    setAnchorElTechnicians(null);
    setOpenMenuTechnicians(false);
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
    navigate("/admin-login");
  };

  return (
    <Sidebar variant="persistent" anchor="left" open={open}>
      <SidebarContent>
        <List>
          {/* Back Arrow */}
          <ListItem button onClick={() => navigate("/admin-dashboard")}>
            <ListItemIcon>
              <ArrowBack sx={{ color: "#fff" }} />
            </ListItemIcon>
          </ListItem>

          {/* Sidebar Title */}
          <Title>
            <span>Service Center</span>
          </Title>

          {/* Dashboard Link */}
          <ListItemStyled button component={Link} to="/admin-dashboard">
            <ListItemIcon>
              <Home sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: "#fff" }} /> {/* Set text color to white */}
          </ListItemStyled>

          {/* Inventory Menu */}
          <ListItemStyled button onClick={handleClickInventory}>
            <ListItemIcon>
              <Store sx={{ color: "#fff" }} /> {/* Changed to Store icon */}
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuInventory ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElInventory}
            open={openMenuInventory}
            onClose={handleCloseInventory}
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
              to="/centerview-inventory"
              onClick={handleCloseInventory}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Inventory" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/restock-inventory"
              onClick={handleCloseInventory}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Restock" />
            </MenuItem>
          </Menu>

          {/* Appointments Menu */}
          <ListItemStyled button onClick={handleClickAppointments}>
            <ListItemIcon>
              <Pending sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuAppointments ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElAppointments}
            open={openMenuAppointments}
            onClose={handleCloseAppointments}
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
              to="/pending-appointments"
              onClick={handleCloseAppointments}
            >
              <ListItemIcon>
                <Pending sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Pending" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/approved-appointments"
              onClick={handleCloseAppointments}
            >
              <ListItemIcon>
                <CheckCircle sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Approved" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/rejected-appointments"
              onClick={handleCloseAppointments}
            >
              <ListItemIcon>
                <Cancel sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Rejected" />
            </MenuItem>
          </Menu>

          {/* Service Jobs Menu */}
          <ListItemStyled button onClick={handleClickServiceJobs}>
            <ListItemIcon>
              <Work sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Service Jobs" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuServiceJobs ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElServiceJobs}
            open={openMenuServiceJobs}
            onClose={handleCloseServiceJobs}
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
              to="/assign-job"
              onClick={handleCloseServiceJobs}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Assign Job" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/jobs-in-progress"
              onClick={handleCloseServiceJobs}
            >
              <ListItemIcon>
                <Work sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Jobs in Progress" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/completed-jobs"
              onClick={handleCloseServiceJobs}
            >
              <ListItemIcon>
                <History sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Completed Jobs" />
            </MenuItem>
          </Menu>

          {/* Customers Menu */}
          <ListItemStyled button onClick={handleClickCustomer}>
            <ListItemIcon>
              <People sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuCustomer ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElCustomer}
            open={openMenuCustomer}
            onClose={handleCloseCustomer}
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
              to="/view-customer-details"
              onClick={handleCloseCustomer}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Customer Details" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-service-history"
              onClick={handleCloseCustomer}
            >
              <ListItemIcon>
                <History sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Service History" />
            </MenuItem>
          </Menu>

          {/* Technicians Menu */}
          <ListItemStyled button onClick={handleClickTechnicians}>
            <ListItemIcon>
              <Engineering sx={{ color: "#fff" }} /> {/* Changed to Engineering icon */}
            </ListItemIcon>
            <ListItemText primary="Technicians" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuTechnicians ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElTechnicians}
            open={openMenuTechnicians}
            onClose={handleCloseTechnicians}
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
              to="/add-technician"
              onClick={handleCloseTechnicians}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Technician" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-technicians"
              onClick={handleCloseTechnicians}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Technicians" />
            </MenuItem>
          </Menu>
        </List>
      </SidebarContent>

      {/* Profile Menu */}
      <ListItemStyled button onClick={handleClickProfile}>
        <ListItemIcon>
          <Person sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
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
            <ViewList sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/edit-profile"
          onClick={handleCloseProfile}
        >
          <ListItemIcon>
            <AddCircle sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </MenuItem>
      </Menu>

      {/* Logout Button at the Bottom */}
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Sidebar>
  );
};

export default AdminSidebar;


