import { useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function CodeAssistant() {
  const [language, setLanguage] = useState("JavaScript");
  const [request, setRequest] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fieldStyle = {
    "& .MuiInputBase-root": {
      color: "#ffffff",
      background: "rgba(2, 6, 23, 0.35)",
    },

    "& .MuiInputBase-input": {
      color: "#ffffff",
    },

    "& .MuiInputBase-input::placeholder": {
      color: "#94a3b8",
      opacity: 1,
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
      borderWidth: "1px",
    },
  };

  const handleGenerate = async () => {
    if (!request.trim()) {
      setSnackbar({
        open: true,
        message: "Please describe what you want to build",
        severity: "warning",
      });

      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setSnackbar({
        open: true,
        message: "Please login first",
        severity: "error",
      });

      return;
    }

    try {
      setLoading(true);
      setCode("");

      const response = await axios.post(
        "http://localhost:5000/api/tools/code-assistant",
        {
          code: request.trim(),
          language: language,
          request: request.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCode(response.data.result);

        setSnackbar({
          open: true,
          message: "Code assistant request completed successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Code Assistant Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to process code assistant request",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRequest("");
    setCode("");
  };

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      setSnackbar({
        open: true,
        message: "Code copied successfully",
        severity: "success",
      });
    } catch (error) {
      console.log("Copy failed:", error);

      setSnackbar({
        open: true,
        message: "Copy failed",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 78px)",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
        background:
          "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip
            icon={<AutoAwesomeOutlinedIcon />}
            label="AI POWERED"
            sx={{
              mb: 2,
              color: "#c7d2fe",
              background: "rgba(99, 102, 241, 0.12)",
              border: "1px solid rgba(99, 102, 241, 0.35)",
              fontWeight: 700,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
              mb: 1,
            }}
          >
            AI Code Assistant
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            Generate, explain and improve your code with AJ AI.
          </Typography>
        </Box>

        {/* Main Content */}
        <Stack spacing={3}>
          {/* Request Panel */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              borderRadius: 4,
              background: "rgba(15, 23, 42, 0.82)",
              border: "1px solid rgba(99, 102, 241, 0.22)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CodeOutlinedIcon sx={{ color: "#818cf8" }} />

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Describe Your Code
                </Typography>
              </Box>

              <TextField
                select
                fullWidth
                label="Programming Language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                sx={fieldStyle}
                disabled={loading}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="HTML">HTML</MenuItem>
                <MenuItem value="CSS">CSS</MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                minRows={5}
                label="What do you want to build?"
                placeholder="Example: Create a function to check whether a number is prime..."
                value={request}
                onChange={(event) => setRequest(event.target.value)}
                sx={fieldStyle}
                disabled={loading}
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress
                        size={18}
                        sx={{ color: "#ffffff" }}
                      />
                    ) : (
                      <AutoAwesomeOutlinedIcon />
                    )
                  }
                  onClick={handleGenerate}
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.4,
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
                  {loading ? "Generating..." : "Generate Code"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    px: 3,
                    borderRadius: 2,
                    color: "#cbd5e1",
                    borderColor: "rgba(148, 163, 184, 0.3)",
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Output Panel */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              borderRadius: 4,
              background: "rgba(15, 23, 42, 0.82)",
              border: "1px solid rgba(99, 102, 241, 0.22)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Generated Code
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ContentCopyOutlinedIcon />}
                  onClick={handleCopy}
                  disabled={!code || loading}
                  sx={{
                    color: "#c7d2fe",
                    borderColor: "rgba(129, 140, 248, 0.4)",
                  }}
                >
                  Copy
                </Button>
              </Box>

              <Box
                sx={{
                  minHeight: 300,
                  p: 2,
                  borderRadius: 2,
                  background: "#020617",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  overflowX: "auto",
                }}
              >
                {code ? (
                  <Box
                    component="pre"
                    sx={{
                      margin: 0,
                      color: "#e2e8f0",
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      lineHeight: 1.7,
                      fontFamily:
                        '"Fira Code", "Cascadia Code", Consolas, monospace',
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {code}
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      color: "#64748b",
                      textAlign: "center",
                      pt: 12,
                    }}
                  >
                    Your generated code will appear here...
                  </Typography>
                )}
              </Box>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                AJ AI Studio • AI code generation is currently simulated
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CodeAssistant;