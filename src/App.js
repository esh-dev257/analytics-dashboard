// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import Dashboard from "./pages/Dashboard";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function App() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  // Create MUI theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      success: {
        main: "#4caf50",
      },
      warning: {
        main: "#ff9800",
      },
      error: {
        main: "#f44336",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode
              ? "0 4px 6px rgba(0, 0, 0, 0.2)"
              : "0 2px 10px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 1 }}
          >
            AD
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            ADmyBRAND
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton selected>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={toggleTheme}>
          <ListItemIcon>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: "block", md: "none" },
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
            open={open}
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                position: "relative",
                whiteSpace: "nowrap",
                width: drawerWidth,
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: "border-box",
                ...(!open && {
                  overflowX: "hidden",
                  transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                  width: theme.spacing(7),
                }),
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              backgroundColor: theme.palette.background.default,
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AppBar
              position="absolute"
              color="default"
              elevation={0}
              sx={{
                position: "fixed",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${theme.palette.divider}`,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                transition: theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                ...(open && {
                  marginLeft: drawerWidth,
                  width: `calc(100% - ${drawerWidth}px)`,
                  transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }),
              }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  sx={{
                    marginRight: "36px",
                    display: { md: "none" },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    display: { xs: "none", md: "flex" },
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit" onClick={toggleTheme}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" sx={{ ml: 1 }}>
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                  >
                    AD
                  </Avatar>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                pt: 8, // Add padding to account for the AppBar
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Dashboard />
              </Container>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
