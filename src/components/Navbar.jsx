import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";

import {
  AutoAwesome,
  Login,
  Logout,
  Menu,
  Close,
  RocketLaunch,
  DashboardOutlined,
  HistoryOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    closeMobileMenu();

    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className="aj-navbar"
      >
        <Container maxWidth="xl">
          <Toolbar className="aj-toolbar">

            {/* LOGO */}
            <Link
              to="/"
              className="aj-logo-link"
              onClick={closeMobileMenu}
            >
              <Box className="aj-logo-icon">
                <AutoAwesome />
              </Box>

              <Typography className="aj-logo-text">
                AJ AI Studio
              </Typography>
            </Link>

            {/* DESKTOP NAV */}
            <Stack
              direction="row"
              className="aj-desktop-nav"
            >
              <Button
                component={Link}
                to="/"
                className="nav-item"
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/features"
                className="nav-item"
              >
                Features
              </Button>

              <Button
                component={Link}
                to="/tools"
                className="nav-item"
              >
                Tools
              </Button>

              {/* LOGGED IN ONLY */}
              {isLoggedIn && (
                <>
                  <Button
                    component={Link}
                    to="/dashboard"
                    className="nav-item"
                    startIcon={
                      <DashboardOutlined />
                    }
                  >
                    Dashboard
                  </Button>

                  <Button
                    component={Link}
                    to="/history"
                    className="nav-item"
                    startIcon={
                      <HistoryOutlined />
                    }
                  >
                    History
                  </Button>

                  <Button
                    component={Link}
                    to="/settings"
                    className="nav-item"
                    startIcon={
                      <SettingsOutlined />
                    }
                  >
                    Settings
                  </Button>
                </>
              )}

              <Button
                component={Link}
                to="/about"
                className="nav-item"
              >
                About
              </Button>
            </Stack>

            {/* DESKTOP ACTIONS */}
            <Stack
              direction="row"
              className="aj-desktop-actions"
            >
              {!isLoggedIn ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<Login />}
                    className="login-btn"
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    startIcon={
                      <RocketLaunch />
                    }
                    className="start-btn"
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  className="login-btn"
                >
                  Logout
                </Button>
              )}
            </Stack>

            {/* MOBILE MENU */}
            <IconButton
              className="mobile-menu-btn"
              onClick={(event) => {
                event.currentTarget.blur();
                setMobileOpen(true);
              }}
            >
              <Menu />
            </IconButton>

          </Toolbar>
        </Container>

        {/* MOVING AI LIGHT */}
        <Box className="navbar-light-line" />
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileMenu}
        slotProps={{
          paper: {
            className: "mobile-drawer",
          },
        }}
      >
        <Box className="mobile-menu">

          {/* MOBILE HEADER */}
          <Box className="mobile-menu-header">
            <Box className="mobile-brand">

              <Box className="aj-logo-icon">
                <AutoAwesome />
              </Box>

              <Typography>
                AJ AI Studio
              </Typography>

            </Box>

            <IconButton
              onClick={closeMobileMenu}
            >
              <Close />
            </IconButton>
          </Box>

          <Stack spacing={1}>

            {/* HOME */}
            <Button
              component={Link}
              to="/"
              onClick={closeMobileMenu}
              className="mobile-nav-item"
            >
              Home
            </Button>

            {/* FEATURES */}
            <Button
              component={Link}
              to="/features"
              onClick={closeMobileMenu}
              className="mobile-nav-item"
            >
              Features
            </Button>

            {/* TOOLS */}
            <Button
              component={Link}
              to="/tools"
              onClick={closeMobileMenu}
              className="mobile-nav-item"
            >
              Tools
            </Button>

            {/* LOGGED IN ONLY */}
            {isLoggedIn && (
              <>
                {/* DASHBOARD */}
                <Button
                  component={Link}
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  startIcon={
                    <DashboardOutlined />
                  }
                  className="mobile-nav-item"
                >
                  Dashboard
                </Button>

                {/* HISTORY */}
                <Button
                  component={Link}
                  to="/history"
                  onClick={closeMobileMenu}
                  startIcon={
                    <HistoryOutlined />
                  }
                  className="mobile-nav-item"
                >
                  History
                </Button>

                {/* SETTINGS */}
                <Button
                  component={Link}
                  to="/settings"
                  onClick={closeMobileMenu}
                  startIcon={
                    <SettingsOutlined />
                  }
                  className="mobile-nav-item"
                >
                  Settings
                </Button>
              </>
            )}

            {/* ABOUT */}
            <Button
              component={Link}
              to="/about"
              onClick={closeMobileMenu}
              className="mobile-nav-item"
            >
              About
            </Button>

            <Box className="mobile-divider" />

            {/* LOGIN / LOGOUT */}
            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  onClick={closeMobileMenu}
                  startIcon={<Login />}
                  className="mobile-login"
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  onClick={closeMobileMenu}
                  startIcon={
                    <RocketLaunch />
                  }
                  className="mobile-start"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                startIcon={<Logout />}
                className="mobile-login"
              >
                Logout
              </Button>
            )}

          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;