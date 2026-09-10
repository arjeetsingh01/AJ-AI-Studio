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
  MenuItem,
  Snackbar,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function EmailWriter() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleGenerate = async () => {
    if (!purpose.trim()) {
      showMessage(
        "Email purpose is required",
        "error"
      );
      return;
    }

    if (!details.trim()) {
      showMessage(
        "Email details are required",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      setEmail("");

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to use Email Writer",
          "error"
        );

        return;
      }

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com",
        {
          purpose: purpose.trim(),
          tone: tone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let result = response.data?.result || "";

      // Add recipient/details on frontend
      // because the current backend API only accepts
      // purpose and tone.
      if (result) {
        result =
          `${result}\n\n` +
          `Dear ${recipient.trim() || "Sir/Madam"},\n\n` +
          `${details.trim()}\n\n` +
          `I look forward to hearing from you.\n\n` +
          `Best regards,\n` +
          `Your Name`;
      }

      setEmail(result);

      showMessage(
        response.data?.message ||
          "Email generated successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Email Writer Error:",
        error
      );

      if (error.response?.status === 401) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
      } else {
        showMessage(
          error.response?.data?.message ||
            "Failed to generate email",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPurpose("");
    setRecipient("");
    setDetails("");
    setTone("Professional");
    setEmail("");
  };

  const handleCopy = async () => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);

      showMessage(
        "Email copied to clipboard",
        "success"
      );
    } catch (error) {
      console.log("Copy failed:", error);

      showMessage(
        "Failed to copy email",
        "error"
      );
    }
  };

  const fieldStyle = {
    "& .MuiInputBase-root": {
      color: "#ffffff",
      background:
        "rgba(2, 6, 23, 0.35)",
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
            "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
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
              Email Writer
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
            Create clear and professional emails
            with the help of AI.
          </Typography>
        </Box>

        {/* Main */}
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
          {/* Input */}
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
                <EmailOutlinedIcon
                  sx={{ color: "#818cf8" }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Email Details
                </Typography>
              </Box>

              <Button
                size="small"
                startIcon={
                  <DeleteOutlineOutlinedIcon />
                }
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
                label="Email Purpose"
                placeholder="e.g. Job application, meeting request..."
                value={purpose}
                onChange={(event) =>
                  setPurpose(event.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                fullWidth
                label="Recipient"
                placeholder="e.g. Hiring Manager"
                value={recipient}
                onChange={(event) =>
                  setRecipient(event.target.value)
                }
                sx={fieldStyle}
              />

              <TextField
                select
                fullWidth
                label="Tone"
                value={tone}
                onChange={(event) =>
                  setTone(event.target.value)
                }
                sx={fieldStyle}
              >
                <MenuItem value="Professional">
                  Professional
                </MenuItem>

                <MenuItem value="Friendly">
                  Friendly
                </MenuItem>

                <MenuItem value="Formal">
                  Formal
                </MenuItem>

                <MenuItem value="Casual">
                  Casual
                </MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                minRows={7}
                label="Email Details"
                placeholder="Tell AI what you want to say..."
                value={details}
                onChange={(event) =>
                  setDetails(event.target.value)
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
                  !purpose.trim() ||
                  !details.trim() ||
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
                  ? "Generating Email..."
                  : "Generate Email"}
              </Button>
            </Stack>
          </Paper>

          {/* Output */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
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
                  sx={{ color: "#c084fc" }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Generated Email
                </Typography>
              </Box>

              {email && (
                <Button
                  size="small"
                  startIcon={
                    <ContentCopyOutlinedIcon />
                  }
                  onClick={handleCopy}
                  sx={{
                    color: "#818cf8",
                  }}
                >
                  Copy
                </Button>
              )}
            </Stack>

            <Box
              sx={{
                minHeight: 500,
                p: {
                  xs: 2,
                  sm: 3,
                },
                borderRadius: 3,
                background:
                  "rgba(2,6,23,0.55)",
                border:
                  "1px solid rgba(148,163,184,0.1)",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    minHeight: 450,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
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
                      AI is writing your email...
                    </Typography>
                  </Box>
                </Box>
              ) : email ? (
                <Typography
                  sx={{
                    color: "#e2e8f0",
                    lineHeight: 1.8,
                    whiteSpace:
                      "pre-wrap",
                    wordBreak:
                      "break-word",
                  }}
                >
                  {email}
                </Typography>
              ) : (
                <Box
                  sx={{
                    minHeight: 450,
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <EmailOutlinedIcon
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
                      Your generated email
                      will appear here.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
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

export default EmailWriter;