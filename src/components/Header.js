// src/components/Header.js
import React, { useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.default, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: "400px", // Prevent search from getting too wide on large screens
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Header = ({ toggleSidebar, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
          mt: 1.5,
          width: 200,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Sign out
      </MenuItem>
    </Menu>
  );

  const notificationsMenuId = "notifications-menu";
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
          mt: 1.5,
          width: { xs: "100vw", sm: 320 },
          maxWidth: { xs: "calc(100% - 32px)", sm: 320 },
          maxHeight: 400,
        },
      }}
    >
      <Typography sx={{ p: 2, fontWeight: "medium" }}>Notifications</Typography>
      <Divider />
      <List sx={{ p: 0 }}>
        {[
          {
            avatar: "U",
            color: "primary.main",
            message: "User count increased by 7%",
            time: "2 hours ago",
          },
          {
            avatar: "S",
            color: "success.main",
            message: "New social media integration added",
            time: "Yesterday at 2:30 PM",
          },
          {
            avatar: "C",
            color: "secondary.main",
            message: 'Campaign "Summer Sale" is performing well',
            time: "5 hours ago",
          },
        ].map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" sx={{ px: 2, py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: notification.color }}>
                  {notification.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={
                  <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {notification.time}
                  </Typography>
                }
              />
            </ListItem>
            {index < 2 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography
          component="a"
          href="#"
          variant="body2"
          color="primary"
          sx={{
            display: "block",
            p: 1,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View all notifications
        </Typography>
      </Box>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
        bgcolor: "background.paper",
        color: "text.primary",
        width: {
          xs: "100vw !important", // Always full width on mobile
          sm: "100vw !important", // Always full width on tablet
          md: "100vw !important", // Always full width on desktop
        },
        left: "0 !important",
        right: "0 !important",
        top: "0 !important",
        maxWidth: "none !important",
        minWidth: "100vw !important",
        transform: "none !important",
        marginLeft: "0 !important",
        marginRight: "0 !important",
        // Override any Material-UI drawer transitions that might affect positioning
        transition: "none !important",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56 },
          px: { xs: 1, sm: 2 },
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "none !important",
          minWidth: "100%",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 1, flexShrink: 0 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo/Brand - Always visible but smaller text on mobile */}
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          noWrap
          component="div"
          sx={{
            fontWeight: "bold",
            mr: { xs: 1, sm: 2 },
            flexShrink: 0,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          ADmyBRAND
        </Typography>

        {/* Search bar - Always visible, takes available space */}
        <Search
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100% !important",
            maxWidth: { xs: "none", md: "400px" }, // No max width on mobile, limit on desktop
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Action buttons - Always visible with responsive sizing */}
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <IconButton
            size="small"
            aria-label="toggle dark mode"
            color="inherit"
            onClick={toggleTheme}
            sx={{ mx: { xs: 0.5, sm: 1 } }}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            )}
          </IconButton>

          <IconButton
            size="small"
            aria-label="show notifications"
            aria-controls={notificationsMenuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleNotificationsMenuOpen}
            sx={{ mx: { xs: 0.5, sm: 1 } }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Badge>
          </IconButton>

          <IconButton
            size="small"
            aria-label="account"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ mx: { xs: 0.5, sm: 1 } }}
          >
            <Avatar
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                bgcolor: "primary.main",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              }}
            >
              AD
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
      {renderNotificationsMenu}
    </AppBar>
  );
};

export default Header;
