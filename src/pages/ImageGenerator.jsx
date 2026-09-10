import { useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [result, setResult] = useState(null);
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
    if (!prompt.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter an image prompt",
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
      setGenerated(false);
      setResult(null);

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com/api/tools/image-generator",
        {
          prompt: prompt.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setResult(response.data.result);
        setGenerated(true);

        setSnackbar({
          open: true,
          message: "Image generation request processed successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Image Generator Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to generate image",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setGenerated(false);
    setResult(null);
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
          "radial-gradient(circle at top left, #1e1b4b, #070a12 45%, #020617)",
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
            AI Image Generator
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            Turn your ideas into beautiful AI-generated visuals.
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Prompt Section */}
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
                <ImageOutlinedIcon sx={{ color: "#818cf8" }} />

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Describe Your Image
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                minRows={5}
                label="Image Prompt"
                placeholder="Example: A futuristic city at night with neon lights and flying cars..."
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                sx={fieldStyle}
                disabled={loading}
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Button
                  fullWidth
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
                  {loading ? "Generating..." : "Generate Image"}
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

          {/* Generated Image */}
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
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1.1rem",
                mb: 2,
              }}
            >
              Generated Image
            </Typography>

            <Box
              sx={{
                minHeight: { xs: 280, sm: 400 },
                borderRadius: 3,
                overflow: "hidden",
                background:
                  "radial-gradient(circle at 50% 35%, rgba(99,102,241,0.35), rgba(2,6,23,1) 65%)",
                border: "1px solid rgba(148, 163, 184, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {generated ? (
                <Box
                  sx={{
                    width: "100%",
                    minHeight: { xs: 280, sm: 400 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                  }}
                >
                  <AutoAwesomeOutlinedIcon
                    sx={{
                      fontSize: { xs: 60, sm: 80 },
                      color: "#818cf8",
                      mb: 2,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", sm: "1.4rem" },
                      mb: 1,
                    }}
                  >
                    Image Generation Request Received
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94a3b8",
                      maxWidth: 600,
                      wordBreak: "break-word",
                    }}
                  >
                    "{result?.prompt || prompt}"
                  </Typography>

                  <Chip
                    label={result?.status || "Request Processed"}
                    sx={{
                      mt: 3,
                      color: "#c7d2fe",
                      background: "rgba(99, 102, 241, 0.15)",
                      border:
                        "1px solid rgba(99, 102, 241, 0.35)",
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", px: 3 }}>
                  <ImageOutlinedIcon
                    sx={{
                      fontSize: 70,
                      color: "#475569",
                      mb: 2,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#64748b",
                    }}
                  >
                    Your generated image will appear here...
                  </Typography>
                </Box>
              )}
            </Box>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.8rem",
                textAlign: "center",
                mt: 2,
              }}
            >
              AJ AI Studio • Image generation is currently simulated
            </Typography>
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

export default ImageGenerator;