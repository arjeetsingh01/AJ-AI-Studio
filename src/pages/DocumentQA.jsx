import { useState } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

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

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function DocumentQA() {
  const [documentName, setDocumentName] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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

  // Read TXT file
  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(String(reader.result || ""));
      };

      reader.onerror = () => {
        reject(new Error("Failed to read text file"));
      };

      reader.readAsText(file);
    });
  };

  // Extract text from PDF
  const readPdfFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str || "")
        .join(" ");

      fullText += `\n\nPage ${pageNumber}:\n${pageText}`;
    }

    return fullText.trim();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setDocumentName(file.name);
    setDocumentText("");
    setAnswer("");

    try {
      setLoading(true);

      const fileName = file.name.toLowerCase();

      let extractedText = "";

      // TXT
      if (file.type === "text/plain" || fileName.endsWith(".txt")) {
        extractedText = await readTextFile(file);
      }

      // PDF
      else if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
        extractedText = await readPdfFile(file);
      }

      // DOC / DOCX
      else {
        setSnackbar({
          open: true,
          message:
            "Currently only TXT and PDF documents are supported.",
          severity: "warning",
        });

        return;
      }

      if (!extractedText.trim()) {
        setSnackbar({
          open: true,
          message:
            "No readable text was found in this document.",
          severity: "warning",
        });

        return;
      }

      setDocumentText(extractedText);

      setSnackbar({
        open: true,
        message:
          fileName.endsWith(".pdf")
            ? "PDF text extracted successfully"
            : "Text document loaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Document Reading Error:", error);

      setDocumentText("");

      setSnackbar({
        open: true,
        message:
          "Failed to read the document. Please try another file.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!documentName) {
      setSnackbar({
        open: true,
        message: "Please choose a document first",
        severity: "warning",
      });

      return;
    }

    if (!documentText.trim()) {
      setSnackbar({
        open: true,
        message:
          "Please select a TXT or PDF document with readable text.",
        severity: "warning",
      });

      return;
    }

    if (!question.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter your question",
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
      setAnswer("");

      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com/api/tools/document-qa",
        {
          documentText: documentText.trim(),
          question: question.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.data.success) {
        setAnswer(response.data.result);

        setSnackbar({
          open: true,
          message:
            "Document question processed successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Document Q&A Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to process document question",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDocumentName("");
    setDocumentText("");
    setQuestion("");
    setAnswer("");
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
              fontSize: {
                xs: "2rem",
                sm: "2.6rem",
                md: "3.2rem",
              },
              mb: 1,
            }}
          >
            Document Q&A
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 700,
              mx: "auto",
              fontSize: {
                xs: "0.95rem",
                sm: "1rem",
              },
            }}
          >
            Upload a TXT or PDF document and ask questions
            about its content.
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Document Section */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
              borderRadius: 4,
              background: "rgba(15, 23, 42, 0.82)",
              border:
                "1px solid rgba(99, 102, 241, 0.22)",
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
                <DescriptionOutlinedIcon
                  sx={{ color: "#818cf8" }}
                />

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Upload Document
                </Typography>
              </Box>

              <Button
                component="label"
                variant="outlined"
                startIcon={
                  loading ? (
                    <CircularProgress
                      size={18}
                      sx={{ color: "#c7d2fe" }}
                    />
                  ) : (
                    <DescriptionOutlinedIcon />
                  )
                }
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  color: "#c7d2fe",
                  borderColor:
                    "rgba(129, 140, 248, 0.4)",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                {loading
                  ? "Reading document..."
                  : documentName || "Choose Document"}

                <input
                  type="file"
                  hidden
                  accept=".pdf,.txt"
                  onChange={handleFileChange}
                />
              </Button>

              {documentName && (
                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  Selected: {documentName}
                </Typography>
              )}

              {documentText && (
                <Typography
                  sx={{
                    color: "#818cf8",
                    fontSize: "0.85rem",
                  }}
                >
                  ✓ Document text loaded successfully
                </Typography>
              )}

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.8rem",
                }}
              >
                Supported formats: TXT and PDF
              </Typography>
            </Stack>
          </Paper>

          {/* Question Section */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
              borderRadius: 4,
              background: "rgba(15, 23, 42, 0.82)",
              border:
                "1px solid rgba(99, 102, 241, 0.22)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Stack spacing={2.5}>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                Ask Your Question
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Your Question"
                placeholder="Example: What are the main points discussed in this document?"
                value={question}
                onChange={(event) =>
                  setQuestion(event.target.value)
                }
                sx={fieldStyle}
                disabled={loading}
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
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
                      <SendOutlinedIcon />
                    )
                  }
                  onClick={handleAsk}
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
                  {loading
                    ? "Processing..."
                    : "Ask AI"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={
                    <DeleteOutlineOutlinedIcon />
                  }
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    px: 3,
                    borderRadius: 2,
                    color: "#cbd5e1",
                    borderColor:
                      "rgba(148, 163, 184, 0.3)",
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Answer Section */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
              borderRadius: 4,
              background: "rgba(15, 23, 42, 0.82)",
              border:
                "1px solid rgba(99, 102, 241, 0.22)",
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
              AI Answer
            </Typography>

            <Box
              sx={{
                minHeight: 220,
                p: 3,
                borderRadius: 3,
                background: "#020617",
                border:
                  "1px solid rgba(148, 163, 184, 0.12)",
                display: "flex",
                alignItems: answer
                  ? "flex-start"
                  : "center",
                justifyContent: answer
                  ? "flex-start"
                  : "center",
              }}
            >
              {answer ? (
                <Typography
                  sx={{
                    color: "#e2e8f0",
                    lineHeight: 1.8,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {answer}
                </Typography>
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <AutoAwesomeOutlinedIcon
                    sx={{
                      fontSize: 55,
                      color: "#475569",
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{ color: "#64748b" }}
                  >
                    AI answers will appear here...
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
              AJ AI Studio • Powered by Gemini
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

export default DocumentQA;