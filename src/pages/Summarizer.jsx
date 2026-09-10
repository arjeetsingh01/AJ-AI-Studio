import { useState } from "react";

import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

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

  const handleSummarize = async () => {
    if (!text.trim()) {
      showMessage("Please enter some text first", "error");
      return;
    }

    try {
      setLoading(true);
      setSummary("");

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to use the Summarizer",
          "error"
        );

        return;
      }

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com",
        {
          text: text.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(response.data?.result || "");

      showMessage(
        response.data?.message ||
          "Text summarized successfully",
        "success"
      );
    } catch (error) {
      console.error("Summarizer Error:", error);

      if (error.response?.status === 401) {
        showMessage(
          "Session expired. Please login again.",
          "error"
        );
      } else {
        showMessage(
          error.response?.data?.message ||
            "Failed to summarize text",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSummary("");
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
              background: "rgba(99,102,241,0.12)",
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
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Summarizer
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
            Turn long text into clear, concise summaries
            in seconds.
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
              md: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          {/* Input */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              minHeight: 500,
              borderRadius: 4,
              background: "rgba(15,23,42,0.78)",
              border:
                "1px solid rgba(99,102,241,0.2)",
              backdropFilter: "blur(18px)",
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
                <SummarizeOutlinedIcon
                  sx={{ color: "#818cf8" }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Your Text
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

            <TextField
              fullWidth
              multiline
              minRows={13}
              maxRows={18}
              placeholder="Paste your long text here..."
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                  alignItems: "flex-start",
                },

                "& textarea::placeholder": {
                  color: "#64748b",
                  opacity: 1,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    "rgba(148,163,184,0.15)",
                },

                "&:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      "rgba(99,102,241,0.5)",
                  },

                "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#6366f1",
                  },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSummarize}
              disabled={!text.trim() || loading}
              startIcon={
                <AutoAwesomeOutlinedIcon />
              }
              sx={{
                mt: 2,
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
                ? "Summarizing..."
                : "Summarize Text"}
            </Button>
          </Paper>

          {/* Output */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              minHeight: 500,
              borderRadius: 4,
              background: "rgba(15,23,42,0.78)",
              border:
                "1px solid rgba(99,102,241,0.2)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              mb={2}
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
                AI Summary
              </Typography>
            </Stack>

            <Box
              sx={{
                minHeight: 420,
                p: 2,
                borderRadius: 3,
                background: "rgba(2,6,23,0.55)",
                border:
                  "1px solid rgba(148,163,184,0.1)",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    height: 380,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <AutoAwesomeOutlinedIcon
                      sx={{
                        fontSize: 48,
                        color: "#6366f1",
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#94a3b8",
                      }}
                    >
                      AI is processing your text...
                    </Typography>
                  </Box>
                </Box>
              ) : summary ? (
                <Typography
                  sx={{
                    color: "#e2e8f0",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {summary}
                </Typography>
              ) : (
                <Box
                  sx={{
                    height: 380,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <AutoAwesomeOutlinedIcon
                      sx={{
                        fontSize: 48,
                        color: "#4f46e5",
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#64748b",
                      }}
                    >
                      Your AI summary will appear
                      here.
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

export default Summarizer;