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
  Store, // Using Store icon
  Engineering, // Changed icon for Inventory
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
  fontSize: "1.5rem", // Increase font size
  fontWeight: "bold", // Make the text bold
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

const SuperAdminSidebar = ({ open }) => {
  const [anchorElInventory, setAnchorElInventory] = useState(null);
  const [openMenuInventory, setOpenMenuInventory] = useState(false);
  const [anchorElServiceCenters, setAnchorElServiceCenters] = useState(null);
  const [openMenuServiceCenters, setOpenMenuServiceCenters] = useState(false);
  const [anchorElRestock, setAnchorElRestock] = useState(null);
  const [openMenuRestock, setOpenMenuRestock] = useState(false);
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

  const handleClickServiceCenters = (event) => {
    setAnchorElServiceCenters(event.currentTarget);
    setOpenMenuServiceCenters(!openMenuServiceCenters);
  };

  const handleCloseServiceCenters = () => {
    setAnchorElServiceCenters(null);
    setOpenMenuServiceCenters(false);
  };

  const handleClickRestock = (event) => {
    setAnchorElRestock(event.currentTarget);
    setOpenMenuRestock(!openMenuRestock);
  };

  const handleCloseRestock = () => {
    setAnchorElRestock(null);
    setOpenMenuRestock(false);
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
    navigate("/superadmin-login");
  };

  return (
    <Sidebar variant="persistent" anchor="left" open={open}>
      <SidebarContent>
        <List>
          {/* Back Arrow */}
          <ListItem button onClick={() => navigate("/superadmin-dashboard")}>
            <ListItemIcon>
              <ArrowBack sx={{ color: "#fff" }} />
            </ListItemIcon>
          </ListItem>

          {/* Sidebar Title */}
          <Title>
            <span>Warehouse</span>
          </Title>

          {/* Dashboard Link */}
          <ListItemStyled button component={Link} to="/superadmin-dashboard">
            <ListItemIcon>
              <Home sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: "#fff" }} />
          </ListItemStyled>

          {/* Inventory Menu */}
          <ListItemStyled button onClick={handleClickInventory}>
            <ListItemIcon>
              <Engineering sx={{ color: "#fff" }} /> {/* Changed icon */}
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
              to="/add-inventory"
              onClick={handleCloseInventory}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Inventory" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-inventory"
              onClick={handleCloseInventory}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Inventory" />
            </MenuItem>
          </Menu>

          {/* Restock Menu */}
          <ListItemStyled button onClick={handleClickRestock}>
            <ListItemIcon>
              <Add sx={{ color: "#fff" }} /> {/* Using Add icon for Restock */}
            </ListItemIcon>
            <ListItemText primary="Restock" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuRestock ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElRestock}
            open={openMenuRestock}
            onClose={handleCloseRestock}
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
              to="/restock-inventory"
              onClick={handleCloseRestock}
            >
              <ListItemIcon>
                <Add sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Restock Inventory" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/restock-history"
              onClick={handleCloseRestock}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Restock History" />
            </MenuItem>
          </Menu>

          {/* Service Centers Menu */}
          <ListItemStyled button onClick={handleClickServiceCenters}>
            <ListItemIcon>
              <Store sx={{ color: "#fff" }} /> {/* Using Store icon */}
            </ListItemIcon>
            <ListItemText primary="Service Centers" />
            <RightArrow
              sx={{
                color: "#fff",
                transform: openMenuServiceCenters ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ListItemStyled>
          <Menu
            anchorEl={anchorElServiceCenters}
            open={openMenuServiceCenters}
            onClose={handleCloseServiceCenters}
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
              to="/center-approval"
              onClick={handleCloseServiceCenters}
            >
              <ListItemIcon>
                <AddCircle sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Center Approval" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/superadmin-viewcenters"
              onClick={handleCloseServiceCenters}
            >
              <ListItemIcon>
                <ViewList sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="View Centers" />
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

export default SuperAdminSidebar;
