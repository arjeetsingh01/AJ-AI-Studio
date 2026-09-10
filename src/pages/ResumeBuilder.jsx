import { useState } from "react";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
  Chip,
  Divider,
  Snackbar,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

function ResumeBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");

  // Gemini generated resume
  const [generatedResume, setGeneratedResume] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // =====================================================
  // GENERATE RESUME
  // =====================================================

  const handleGenerate = async () => {
    if (!name.trim()) {
      showMessage("Full name is required", "error");
      return;
    }

    if (!role.trim()) {
      showMessage("Job role is required", "error");
      return;
    }

    try {
      setLoading(true);
      setGeneratedResume("");

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to use Resume Builder",
          "error"
        );
        return;
      }

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com/api/tools/resume-builder",
        {
          name: name.trim(),
          email: email.trim(),
          role: role.trim(),
          skills: skills.trim(),
          experience: about.trim(),
          education: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        const result = response.data?.result || "";

        setGeneratedResume(result);

        showMessage(
          response.data?.message ||
            "Resume generated successfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Resume Builder Error:", error);

      if (error.response?.status === 401) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
      } else {
        showMessage(
          error.response?.data?.message ||
            "Failed to generate resume",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLEAR
  // =====================================================

  const handleClear = () => {
    setName("");
    setEmail("");
    setRole("");
    setSkills("");
    setAbout("");
    setGeneratedResume("");
  };

  // =====================================================
  // DOWNLOAD AI RESUME
  // =====================================================

  const handleDownload = () => {
    if (!generatedResume) {
      return;
    }

    const resumeContent = generatedResume.trim();

    const blob = new Blob(
      [resumeContent],
      {
        type: "text/plain",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${name
      .trim()
      .replace(/\s+/g, "_")}_AI_Resume.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(
      "AI resume downloaded successfully",
      "success"
    );
  };

  // =====================================================
  // FIELD STYLE
  // =====================================================

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
      borderColor:
        "rgba(148, 163, 184, 0.25)",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor:
        "rgba(129, 140, 248, 0.65)",
    },

    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6366f1",
      borderWidth: "1px",
    },
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 78px)",
          px: { xs: 1.5, sm: 3, md: 5 },
          py: { xs: 2, md: 4 },
          background:
            "radial-gradient(circle at top left, #1e1b4b, #070a12 45%, #020617)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            maxWidth: 1150,
            mx: "auto",
            mb: 4,
            textAlign: "center",
          }}
        >
          <Chip
            icon={<AutoAwesomeOutlinedIcon />}
            label="AI POWERED"
            sx={{
              mb: 2,
              color: "#c4b5fd",
              background:
                "rgba(99,102,241,0.12)",
              border:
                "1px solid rgba(99,102,241,0.25)",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                sm: "2.7rem",
                md: "3.2rem",
              },
            }}
          >
            AI{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(90deg, #818cf8, #c084fc)",
                backgroundClip: "text",
                WebkitBackgroundClip:
                  "text",
                WebkitTextFillColor:
                  "transparent",
              }}
            >
              Resume Builder
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 650,
              mx: "auto",
              mt: 1.5,
            }}
          >
            Create a professional resume with a
            clean AI-powered layout.
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            maxWidth: 1150,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.9fr 1.1fr",
            },
            gap: 3,
          }}
        >
          {/* FORM */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              background:
                "rgba(15,23,42,0.78)",
              border:
                "1px solid rgba(99,102,241,0.2)",
              backdropFilter:
                "blur(18px)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{
                    color: "#818cf8",
                  }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Resume Details
                </Typography>
              </Box>

              <Button
                size="small"
                onClick={handleClear}
                sx={{
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#f87171",
                  },
                }}
              >
                Clear
              </Button>
            </Stack>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                fullWidth
                label="Job Role"
                placeholder="e.g. Frontend Developer"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Skills"
                placeholder="React, JavaScript, Node.js..."
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="About You"
                placeholder="Write a short professional introduction..."
                value={about}
                onChange={(e) =>
                  setAbout(e.target.value)
                }
                sx={fieldStyle}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={
                  <AutoAwesomeOutlinedIcon />
                }
                onClick={handleGenerate}
                disabled={
                  !name.trim() ||
                  !role.trim() ||
                  loading
                }
                sx={{
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #4f46e5, #7c3aed)",
                  },
                }}
              >
                {loading
                  ? "Generating Resume..."
                  : "Generate Resume"}
              </Button>
            </Stack>
          </Paper>

          {/* AI PREVIEW */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              minHeight: 600,
              borderRadius: 4,
              background:
                "rgba(15,23,42,0.78)",
              border:
                "1px solid rgba(99,102,241,0.2)",
              backdropFilter:
                "blur(18px)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AutoAwesomeOutlinedIcon
                  sx={{
                    color: "#c084fc",
                  }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  AI Resume Preview
                </Typography>
              </Box>

              {generatedResume && (
                <Button
                  size="small"
                  startIcon={
                    <DownloadOutlinedIcon />
                  }
                  onClick={handleDownload}
                  sx={{
                    color: "#818cf8",
                  }}
                >
                  Download
                </Button>
              )}
            </Stack>

            <Divider
              sx={{
                borderColor:
                  "rgba(148,163,184,0.12)",
                mb: 3,
              }}
            />

            {loading ? (
              <Box
                sx={{
                  minHeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <AutoAwesomeOutlinedIcon
                    sx={{
                      fontSize: 55,
                      color: "#6366f1",
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#94a3b8",
                    }}
                  >
                    Gemini is creating your resume...
                  </Typography>
                </Box>
              </Box>
            ) : generatedResume ? (
              <Box
                sx={{
                  background: "#f8fafc",
                  color: "#0f172a",
                  borderRadius: 2,
                  p: {
                    xs: 2,
                    sm: 4,
                  },
                  minHeight: 500,
                  overflow: "auto",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    color: "#1e293b",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                    },
                  }}
                >
                  {generatedResume}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  minHeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <DescriptionOutlinedIcon
                    sx={{
                      fontSize: 55,
                      color: "#4f46e5",
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#64748b",
                    }}
                  >
                    Fill your details and click
                    Generate Resume.
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbar((previous) => ({
            ...previous,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((previous) => ({
              ...previous,
              open: false,
            }))
          }
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ResumeBuilder;