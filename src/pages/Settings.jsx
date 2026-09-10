import { useEffect, useState } from "react";

import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [aiNotifications, setAiNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [openMessage, setOpenMessage] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    severity: "success",
  });

  // Common API config
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Snackbar
  const showMessage = (text, severity = "success") => {
    setMessage({
      text,
      severity,
    });

    setOpenMessage(true);
  };

  // Load profile from backend
  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to access settings",
          "error"
        );

        return;
      }

      const response = await axios.get(
        "https://aj-ai-studio-backend.onrender.com",
        getAuthConfig()
      );

      const user = response.data?.user;

      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
      }
    } catch (error) {
      console.error("Fetch Profile Error:", error);

      showMessage(
        error.response?.data?.message ||
          "Failed to load profile",
        "error"
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  // Load profile when page opens
  useEffect(() => {
    fetchProfile();

    const savedEmailNotifications =
      localStorage.getItem("emailNotifications");

    const savedAiNotifications =
      localStorage.getItem("aiNotifications");

    const savedDarkMode =
      localStorage.getItem("darkMode");

    if (savedEmailNotifications !== null) {
      setEmailNotifications(
        savedEmailNotifications === "true"
      );
    }

    if (savedAiNotifications !== null) {
      setAiNotifications(
        savedAiNotifications === "true"
      );
    }

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  // Save profile
  const handleSave = async () => {
    if (!name.trim()) {
      showMessage("Name is required", "error");
      return;
    }

    if (!email.trim()) {
      showMessage("Email is required", "error");
      return;
    }

    try {
      setSavingProfile(true);

      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        {
          name: name.trim(),
          email: email.trim(),
        },
        getAuthConfig()
      );

      const updatedUser = response.data?.user;

      if (updatedUser) {
        setName(updatedUser.name || "");
        setEmail(updatedUser.email || "");

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
          })
        );
      }

      // Save frontend preferences
      localStorage.setItem(
        "emailNotifications",
        String(emailNotifications)
      );

      localStorage.setItem(
        "aiNotifications",
        String(aiNotifications)
      );

      localStorage.setItem(
        "darkMode",
        String(darkMode)
      );

      showMessage(
        response.data?.message ||
          "Settings saved successfully!",
        "success"
      );
    } catch (error) {
      console.error("Save Profile Error:", error);

      showMessage(
        error.response?.data?.message ||
          "Failed to save settings",
        "error"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!currentPassword) {
      showMessage(
        "Current password is required",
        "error"
      );

      return;
    }

    if (!newPassword) {
      showMessage(
        "New password is required",
        "error"
      );

      return;
    }

    if (newPassword.length < 6) {
      showMessage(
        "New password must be at least 6 characters",
        "error"
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        "New password and confirm password do not match",
        "error"
      );

      return;
    }

    try {
      setChangingPassword(true);

      const response = await axios.put(
        "http://localhost:5000/api/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        getAuthConfig()
      );

      showMessage(
        response.data?.message ||
          "Password changed successfully",
        "success"
      );

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to change password",
        "error"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const fieldStyle = {
    "& .MuiInputBase-root": {
      color: "#ffffff",
      background: "rgba(2, 6, 23, 0.35)",
    },

    "& .MuiInputBase-input": {
      color: "#ffffff",
    },

    "& .MuiInputLabel-root": {
      color: "#cbd5e1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#818cf8",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(148, 163, 184, 0.25)",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(129, 140, 248, 0.65)",
    },

    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6366f1",
    },
  };

  const settingRowStyle = {
    p: 2,
    borderRadius: 2.5,
    background: "rgba(2, 6, 23, 0.35)",
    border: "1px solid rgba(148, 163, 184, 0.08)",
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 78px)",
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 4, md: 6 },
          background:
            "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Chip
              icon={<SettingsOutlinedIcon />}
              label="SETTINGS"
              sx={{
                mb: 2,
                color: "#c7d2fe",
                background:
                  "rgba(99, 102, 241, 0.12)",
                border:
                  "1px solid rgba(99, 102, 241, 0.35)",
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: {
                  xs: "2rem",
                  sm: "2.6rem",
                  md: "3.2rem",
                },
                mb: 1,
              }}
            >
              Settings
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                maxWidth: 650,
                mx: "auto",
              }}
            >
              Manage your AJ AI Studio account and
              preferences.
            </Typography>
          </Box>

          <Stack spacing={3}>
            {/* Profile */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                background:
                  "rgba(15, 23, 42, 0.82)",
                border:
                  "1px solid rgba(99, 102, 241, 0.2)",
                backdropFilter: "blur(18px)",
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <PersonOutlinedIcon
                    sx={{ color: "#818cf8" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                      }}
                    >
                      Profile Information
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.82rem",
                      }}
                    >
                      Update your basic account
                      information.
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    borderColor:
                      "rgba(148, 163, 184, 0.1)",
                  }}
                />

                {loadingProfile ? (
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      textAlign: "center",
                      py: 3,
                    }}
                  >
                    Loading profile...
                  </Typography>
                ) : (
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      sx={fieldStyle}
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      sx={fieldStyle}
                    />
                  </Stack>
                )}
              </Stack>
            </Paper>

            {/* Notifications */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                background:
                  "rgba(15, 23, 42, 0.82)",
                border:
                  "1px solid rgba(99, 102, 241, 0.2)",
                backdropFilter: "blur(18px)",
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <NotificationsOutlinedIcon
                    sx={{ color: "#818cf8" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                      }}
                    >
                      Notifications
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.82rem",
                      }}
                    >
                      Choose which notifications you
                      receive.
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      ...settingRowStyle,
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        Email Notifications
                      </Typography>

                      <Typography
                        sx={{
                          color: "#64748b",
                          fontSize: "0.8rem",
                          mt: 0.3,
                        }}
                      >
                        Receive important updates by
                        email.
                      </Typography>
                    </Box>

                    <Switch
                      checked={emailNotifications}
                      onChange={(event) =>
                        setEmailNotifications(
                          event.target.checked
                        )
                      }
                    />
                  </Box>

                  <Box
                    sx={{
                      ...settingRowStyle,
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        AI Activity Notifications
                      </Typography>

                      <Typography
                        sx={{
                          color: "#64748b",
                          fontSize: "0.8rem",
                          mt: 0.3,
                        }}
                      >
                        Get notifications about your
                        AI activity.
                      </Typography>
                    </Box>

                    <Switch
                      checked={aiNotifications}
                      onChange={(event) =>
                        setAiNotifications(
                          event.target.checked
                        )
                      }
                    />
                  </Box>
                </Stack>
              </Stack>
            </Paper>

            {/* Appearance */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                background:
                  "rgba(15, 23, 42, 0.82)",
                border:
                  "1px solid rgba(99, 102, 241, 0.2)",
                backdropFilter: "blur(18px)",
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <PaletteOutlinedIcon
                    sx={{ color: "#818cf8" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                      }}
                    >
                      Appearance
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.82rem",
                      }}
                    >
                      Customize your workspace
                      appearance.
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    ...settingRowStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 700,
                      }}
                    >
                      Dark Mode
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.8rem",
                        mt: 0.3,
                      }}
                    >
                      Use the dark interface for AJ AI
                      Studio.
                    </Typography>
                  </Box>

                  <Switch
                    checked={darkMode}
                    onChange={(event) =>
                      setDarkMode(event.target.checked)
                    }
                  />
                </Box>
              </Stack>
            </Paper>

            {/* Security */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 4,
                background:
                  "rgba(15, 23, 42, 0.82)",
                border:
                  "1px solid rgba(99, 102, 241, 0.2)",
                backdropFilter: "blur(18px)",
              }}
            >
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <SecurityOutlinedIcon
                    sx={{ color: "#818cf8" }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                      }}
                    >
                      Security
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.82rem",
                      }}
                    >
                      Manage your account security.
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    ...settingRowStyle,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontWeight: 700,
                    }}
                  >
                    Change Password
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "0.8rem",
                      mt: 0.5,
                      mb: 2,
                    }}
                  >
                    Update your account password securely.
                  </Typography>

                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(
                          event.target.value
                        )
                      }
                      sx={fieldStyle}
                    />

                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(
                          event.target.value
                        )
                      }
                      sx={fieldStyle}
                    />

                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      sx={fieldStyle}
                    />

                    <Button
                      variant="outlined"
                      onClick={handleChangePassword}
                      disabled={changingPassword}
                      sx={{
                        alignSelf: {
                          xs: "stretch",
                          sm: "flex-start",
                        },
                        color: "#c7d2fe",
                        borderColor:
                          "rgba(129, 140, 248, 0.4)",
                        borderRadius: 2,
                        fontWeight: 700,
                      }}
                    >
                      {changingPassword
                        ? "Changing Password..."
                        : "Change Password"}
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Save */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
              disabled={
                savingProfile || loadingProfile
              }
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                background:
                  "linear-gradient(90deg, #6366f1, #8b5cf6)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #4f46e5, #7c3aed)",
                },
              }}
            >
              {savingProfile
                ? "Saving Changes..."
                : "Save Changes"}
            </Button>

            <Typography
              sx={{
                color: "#475569",
                textAlign: "center",
                fontSize: "0.78rem",
              }}
            >
              AJ AI Studio • Account settings are securely
              connected to your backend
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openMessage}
        autoHideDuration={3500}
        onClose={() => setOpenMessage(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={message.severity}
          variant="filled"
          onClose={() => setOpenMessage(false)}
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Settings;