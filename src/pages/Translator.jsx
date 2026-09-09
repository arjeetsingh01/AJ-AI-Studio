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
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
} from "@mui/material";

import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

function Translator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [sourceLanguage, setSourceLanguage] =
    useState("English");

  const [targetLanguage, setTargetLanguage] =
    useState("Hindi");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Chinese",
  ];

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

  const handleTranslate = async () => {
    if (!text.trim()) {
      showMessage(
        "Please enter some text first",
        "error"
      );

      return;
    }

    if (sourceLanguage === targetLanguage) {
      showMessage(
        "Source and target languages should be different",
        "error"
      );

      return;
    }

    try {
      setLoading(true);
      setTranslatedText("");

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to use the Translator",
          "error"
        );

        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/tools/translator",
        {
          text: text.trim(),
          targetLanguage: targetLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTranslatedText(
        response.data?.result || ""
      );

      showMessage(
        response.data?.message ||
          "Text translated successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Translator Error:",
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
            "Failed to translate text",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setTranslatedText("");
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
  };

  const handleCopy = async () => {
    if (!translatedText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        translatedText
      );

      showMessage(
        "Translation copied to clipboard",
        "success"
      );
    } catch (error) {
      console.log("Copy failed:", error);

      showMessage(
        "Failed to copy translation",
        "error"
      );
    }
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
              Translator
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
            Translate your text quickly and easily
            with AJ AI.
          </Typography>
        </Box>

        {/* Language Controls */}
        <Box
          sx={{
            maxWidth: 1150,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: {
                xs: 140,
                sm: 180,
              },
            }}
          >
            <InputLabel
              sx={{
                color: "#94a3b8",
              }}
            >
              From
            </InputLabel>

            <Select
              value={sourceLanguage}
              label="From"
              onChange={(event) =>
                setSourceLanguage(
                  event.target.value
                )
              }
              sx={{
                color: "white",

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      "rgba(148,163,184,0.2)",
                  },

                "& .MuiSvgIcon-root": {
                  color: "#94a3b8",
                },
              }}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language}
                  value={language}
                >
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            onClick={handleSwap}
            sx={{
              color: "#818cf8",
              border:
                "1px solid rgba(99,102,241,0.3)",
              background:
                "rgba(99,102,241,0.08)",

              "&:hover": {
                background:
                  "rgba(99,102,241,0.18)",
              },
            }}
          >
            <SwapHorizOutlinedIcon />
          </IconButton>

          <FormControl
            size="small"
            sx={{
              minWidth: {
                xs: 140,
                sm: 180,
              },
            }}
          >
            <InputLabel
              sx={{
                color: "#94a3b8",
              }}
            >
              To
            </InputLabel>

            <Select
              value={targetLanguage}
              label="To"
              onChange={(event) =>
                setTargetLanguage(
                  event.target.value
                )
              }
              sx={{
                color: "white",

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      "rgba(148,163,184,0.2)",
                  },

                "& .MuiSvgIcon-root": {
                  color: "#94a3b8",
                },
              }}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language}
                  value={language}
                >
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Main Translation Area */}
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
              minHeight: 470,
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
                <TranslateOutlinedIcon
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
              minRows={12}
              maxRows={16}
              placeholder="Enter text to translate..."
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                  alignItems:
                    "flex-start",
                },

                "& textarea::placeholder": {
                  color: "#64748b",
                  opacity: 1,
                },

                "& .MuiOutlinedInput-notchedOutline":
                  {
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
              onClick={handleTranslate}
              disabled={
                !text.trim() || loading
              }
              startIcon={
                <TranslateOutlinedIcon />
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
                ? "Translating..."
                : "Translate Text"}
            </Button>
          </Paper>

          {/* Output */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              minHeight: 470,
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
                  Translation
                </Typography>
              </Box>

              {translatedText && (
                <IconButton
                  onClick={handleCopy}
                  sx={{
                    color: "#94a3b8",

                    "&:hover": {
                      color: "#818cf8",
                    },
                  }}
                >
                  <ContentCopyOutlinedIcon />
                </IconButton>
              )}
            </Stack>

            <Box
              sx={{
                minHeight: 390,
                p: 2,
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
                    height: 350,
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
                      AI is processing your
                      translation...
                    </Typography>
                  </Box>
                </Box>
              ) : translatedText ? (
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
                  {translatedText}
                </Typography>
              ) : (
                <Box
                  sx={{
                    height: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <TranslateOutlinedIcon
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
                      Your translation will
                      appear here.
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

export default Translator;