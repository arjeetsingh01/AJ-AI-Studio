import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

function History() {
  const [search, setSearch] = useState("");

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  const [clearing, setClearing] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get icon according to history type
  const getHistoryIcon = (type) => {
    switch (type) {
      case "AI Chat":
        return <ChatOutlinedIcon />;

      case "Code Assistant":
        return <CodeOutlinedIcon />;

      case "Translator":
        return <TranslateOutlinedIcon />;

      case "Summarizer":
        return <DescriptionOutlinedIcon />;

      case "Email Writer":
        return <EmailOutlinedIcon />;

      case "Image Generator":
        return <ImageOutlinedIcon />;

      case "Document Q&A":
        return <ArticleOutlinedIcon />;

      default:
        return <AutoAwesomeOutlinedIcon />;
    }
  };

  // Convert backend tool name into UI name
  const getToolName = (tool) => {
    const toolNames = {
      summarizer: "Summarizer",
      translator: "Translator",
      "resume-builder": "Resume Builder",
      "email-writer": "Email Writer",
      "code-assistant": "Code Assistant",
      "image-generator": "Image Generator",
      "document-qa": "Document Q&A",
    };

    return toolNames[tool] || tool;
  };

  // Format date/time
  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const historyDate = new Date(date);

    if (Number.isNaN(historyDate.getTime())) {
      return "";
    }

    const now = new Date();

    const difference = now.getTime() - historyDate.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return historyDate.toLocaleDateString();
  };

  // Create UI history item from chat
  const createChatHistoryItem = (chat) => {
    const message = chat.message || "";
    const reply = chat.reply || "";

    return {
      id: `chat-${chat._id}`,
      backendId: chat._id,
      category: "chat",
      title: "AI Chat Conversation",
      description: message || reply || "AI Chat conversation",
      type: "AI Chat",
      time: formatTime(chat.createdAt),
      icon: getHistoryIcon("AI Chat"),
    };
  };

  // Create UI history item from tool history
  const createToolHistoryItem = (item) => {
    const toolName = getToolName(item.tool);

    let description = "AI tool activity";

    if (item.tool === "summarizer") {
      description =
        item.input?.text || "Text summarization activity";
    } else if (item.tool === "translator") {
      description =
        item.input?.text || "Translation activity";
    } else if (item.tool === "resume-builder") {
      description =
        item.input?.name
          ? `Resume created for ${item.input.name}`
          : "Resume builder activity";
    } else if (item.tool === "email-writer") {
      description =
        item.input?.purpose || "Professional email activity";
    } else if (item.tool === "code-assistant") {
      description =
        item.input?.request || "Code assistant activity";
    } else if (item.tool === "image-generator") {
      description =
        item.input?.prompt || "Image generation activity";
    } else if (item.tool === "document-qa") {
      description =
        item.input?.question || "Document Q&A activity";
    }

    return {
      id: `tool-${item._id}`,
      backendId: item._id,
      category: "tool",
      title: toolName,
      description,
      type: toolName,
      time: formatTime(item.createdAt),
      icon: getHistoryIcon(toolName),
    };
  };

  // Fetch all history
  const fetchHistory = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setHistory([]);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [chatResponse, toolResponse] = await Promise.all([
        axios.get(
          "http://localhost:5000/api/ai/history",
          config
        ),

        axios.get(
          "http://localhost:5000/api/tool-history",
          config
        ),
      ]);

      const chats = chatResponse.data?.chats || [];

      const tools = toolResponse.data?.history || [];

      const chatHistory = chats.map(createChatHistoryItem);

      const toolHistory = tools.map(createToolHistoryItem);

      const combinedHistory = [
        ...chatHistory,
        ...toolHistory,
      ].sort((a, b) => {
        const dateA = new Date(
          a.category === "chat"
            ? chats.find((chat) => chat._id === a.backendId)?.createdAt
            : tools.find((tool) => tool._id === a.backendId)?.createdAt
        );

        const dateB = new Date(
          b.category === "chat"
            ? chats.find((chat) => chat._id === b.backendId)?.createdAt
            : tools.find((tool) => tool._id === b.backendId)?.createdAt
        );

        return dateB - dateA;
      });

      setHistory(combinedHistory);
    } catch (error) {
      console.error("Fetch History Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to load history",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch history when page opens
  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete one history item
  const handleDeleteItem = async (item) => {
    try {
      setDeletingId(item.id);

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (item.category === "chat") {
        await axios.delete(
          `http://localhost:5000/api/ai/history/${item.backendId}`,
          config
        );
      } else {
        await axios.delete(
          `http://localhost:5000/api/tool-history/${item.backendId}`,
          config
        );
      }

      setHistory((previousHistory) =>
        previousHistory.filter(
          (historyItem) => historyItem.id !== item.id
        )
      );

      setSnackbar({
        open: true,
        message: "History deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Delete History Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to delete history",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Clear complete history
  const handleClearHistory = async () => {
    if (history.length === 0) {
      return;
    }

    try {
      setClearing(true);

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Delete all history items individually.
      await Promise.all(
        history.map((item) => {
          if (item.category === "chat") {
            return axios.delete(
              `http://localhost:5000/api/ai/history/${item.backendId}`,
              config
            );
          }

          return axios.delete(
            `http://localhost:5000/api/tool-history/${item.backendId}`,
            config
          );
        })
      );

      setHistory([]);

      setSnackbar({
        open: true,
        message: "All history cleared successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Clear History Error:", error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to clear history",
        severity: "error",
      });

      // Refresh in case some items were deleted
      fetchHistory();
    } finally {
      setClearing(false);
    }
  };

  // Search history
  const filteredHistory = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return history;
    }

    return history.filter((item) => {
      const text = `${item.title} ${item.description} ${item.type}`;

      return text.toLowerCase().includes(searchText);
    });
  }, [history, search]);

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
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip
            icon={<HistoryOutlinedIcon />}
            label="AI HISTORY"
            sx={{
              mb: 2,
              color: "#c7d2fe",
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.35)",
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
            Your AI History
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 650,
              mx: "auto",
            }}
          >
            View and manage your recent activity in AJ AI Studio.
          </Typography>
        </Box>

        {/* Search + Clear */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 3,
            borderRadius: 4,
            background: "rgba(15,23,42,0.82)",
            border: "1px solid rgba(99,102,241,0.2)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              placeholder="Search your history..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchOutlinedIcon
                    sx={{
                      color: "#64748b",
                      mr: 1,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  color: "#ffffff",
                  background: "rgba(2,6,23,0.35)",
                },

                "& .MuiInputBase-input": {
                  color: "#ffffff",
                },

                "& .MuiInputBase-input::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(148,163,184,0.25)",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(129,140,248,0.65)",
                },

                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6366f1",
                },
              }}
            />

            <Button
              variant="outlined"
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={handleClearHistory}
              disabled={
                history.length === 0 || clearing
              }
              sx={{
                minWidth: { xs: "100%", sm: 170 },
                color: "#fca5a5",
                borderColor: "rgba(248,113,113,0.35)",
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {clearing ? "Clearing..." : "Clear History"}
            </Button>
          </Stack>
        </Paper>

        {/* History List */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            background: "rgba(15,23,42,0.82)",
            border: "1px solid rgba(99,102,241,0.2)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Stack spacing={2}>
            {/* Section Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                  }}
                >
                  Recent Activity
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: "0.85rem",
                    mt: 0.3,
                  }}
                >
                  {filteredHistory.length} activities found
                </Typography>
              </Box>

              <AutoAwesomeOutlinedIcon
                sx={{
                  color: "#6366f1",
                  fontSize: 30,
                }}
              />
            </Stack>

            {/* Loading */}
            {loading ? (
              <Box
                sx={{
                  py: 9,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                  }}
                >
                  Loading your history...
                </Typography>
              </Box>
            ) : filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "rgba(2,6,23,0.4)",
                    border:
                      "1px solid rgba(148,163,184,0.1)",
                    transition: "all 0.25s ease",

                    "&:hover": {
                      borderColor:
                        "rgba(129,140,248,0.45)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      minWidth: 48,
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#a5b4fc",
                      background:
                        "rgba(99,102,241,0.12)",
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.98rem",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#94a3b8",
                        fontSize: "0.82rem",
                        mt: 0.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: {
                          xs: "normal",
                          sm: "nowrap",
                        },
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Chip
                      label={item.type}
                      size="small"
                      sx={{
                        mt: 1,
                        height: 24,
                        color: "#a5b4fc",
                        background:
                          "rgba(99,102,241,0.1)",
                        border:
                          "1px solid rgba(99,102,241,0.2)",
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>

                  {/* Time + Delete */}
                  <Stack
                    alignItems="flex-end"
                    spacing={1}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "flex",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#64748b",
                        fontSize: "0.75rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.time}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDeleteItem(item)
                      }
                      disabled={
                        deletingId === item.id
                      }
                      sx={{
                        color: "#f87171",

                        "&:hover": {
                          background:
                            "rgba(248,113,113,0.12)",
                        },
                      }}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  py: 9,
                  textAlign: "center",
                }}
              >
                <HistoryOutlinedIcon
                  sx={{
                    fontSize: 65,
                    color: "#334155",
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  No history found
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    mt: 0.7,
                    fontSize: "0.9rem",
                  }}
                >
                  Your AI activity will appear here.
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        {/* Footer Note */}
        <Typography
          sx={{
            color: "#475569",
            textAlign: "center",
            fontSize: "0.78rem",
            mt: 3,
          }}
        >
          AJ AI Studio • History data is securely stored in
          your account
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((previous) => ({
            ...previous,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default History;