// src/components/Sidebar.js
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CampaignIcon from "@mui/icons-material/Campaign";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, active: true },
    { text: "Customers", icon: <PeopleIcon /> },
    { text: "Campaigns", icon: <CampaignIcon /> },
    { text: "Reports", icon: <BarChartIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  const drawer = (
    <>
      <DrawerHeader>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              mr: 1,
            }}
          >
            AD
          </Box>
          <Typography variant="h6" fontWeight="bold">
            ADmyBRAND
          </Typography>
        </Box>
        <IconButton
          onClick={closeSidebar}
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Box sx={{ px: 2, py: 3 }}>
        <Typography variant="overline" color="text.secondary">
          Main
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                ...(item.active && {
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: item.active ? "inherit" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, mt: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "action.hover",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2">Need Help?</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Check our documentation for guides and help
          </Typography>
          <Button variant="contained" fullWidth size="small">
            View Documentation
          </Button>
        </Paper>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={closeSidebar}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
