import { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [openMessage, setOpenMessage] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      setMessageType("warning");
      setOpenMessage(true);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      if (response.data.success) {
        // Save JWT token
        localStorage.setItem(
          "token",
          response.data.token
        );

        // Save user information
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        setMessage("Login successful!");
        setMessageType("success");
        setOpenMessage(true);

        // Go to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );

      setMessageType("error");
      setOpenMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
          background:
            "radial-gradient(circle at top left, #1e1b4b, #070a12 45%, #020617)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 440,
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: "rgba(15, 23, 42, 0.85)",
            border:
              "1px solid rgba(99, 102, 241, 0.25)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 800,
              textAlign: "center",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              textAlign: "center",
              mb: 4,
            }}
          >
            Login to your AJ AI Studio account
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
          >
            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              margin="normal"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon
                      sx={{ color: "#94a3b8" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#94a3b8",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    "rgba(148, 163, 184, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#6366f1",
                  },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#6366f1",
                  },
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              margin="normal"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      sx={{ color: "#94a3b8" }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      disabled={loading}
                      sx={{
                        color: "#94a3b8",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "#94a3b8",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    "rgba(148, 163, 184, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#6366f1",
                  },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#6366f1",
                  },
              }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                background:
                  "linear-gradient(90deg, #6366f1, #8b5cf6)",
                boxShadow:
                  "0 8px 25px rgba(99, 102, 241, 0.25)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #4f46e5, #7c3aed)",
                },
              }}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Message */}
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={() =>
          setOpenMessage(false)
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() =>
            setOpenMessage(false)
          }
          severity={messageType}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;