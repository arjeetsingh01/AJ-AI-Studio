import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const API_BASE =
  "https://aj-ai-studio-backend.onrender.com";

function History() {
  const [activeTab, setActiveTab] = useState(0);

  const [chatHistory, setChatHistory] = useState([]);
  const [toolHistory, setToolHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const showMessage = (
    text,
    severity = "success"
  ) => {
    setMessage({
      open: true,
      text,
      severity,
    });
  };

  const closeMessage = () => {
    setMessage((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // -----------------------------
  // Fetch History
  // -----------------------------
  const fetchHistory = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        showMessage(
          "Please login to view your history.",
          "error"
        );
        return;
      }

      const [chatResponse, toolResponse] =
        await Promise.all([
          axios.get(
            `${API_BASE}/api/ai/history`,
            getAuthConfig()
          ),

          axios.get(
            `${API_BASE}/api/tool-history`,
            getAuthConfig()
          ),
        ]);

      const chats =
        chatResponse.data?.history ||
        chatResponse.data?.data ||
        [];

      const tools =
        toolResponse.data?.history ||
        toolResponse.data?.data ||
        [];

      setChatHistory(
        Array.isArray(chats) ? chats : []
      );

      setToolHistory(
        Array.isArray(tools) ? tools : []
      );
    } catch (error) {
      console.error(
        "Fetch History Error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to load history.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // -----------------------------
  // Normalize history
  // -----------------------------
  const normalizedChatHistory = useMemo(() => {
    return chatHistory.map((item) => ({
      ...item,
      historyType: "chat",
      backendId:
        item._id ||
        item.id ||
        item.historyId,
    }));
  }, [chatHistory]);

  const normalizedToolHistory = useMemo(() => {
    return toolHistory.map((item) => ({
      ...item,
      historyType: "tool",
      backendId:
        item._id ||
        item.id ||
        item.historyId,
    }));
  }, [toolHistory]);

  const currentHistory =
    activeTab === 0
      ? normalizedChatHistory
      : normalizedToolHistory;

  // -----------------------------
  // Date formatter
  // -----------------------------
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Unknown date";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // -----------------------------
  // Tool name
  // -----------------------------
  const getToolName = (item) => {
    return (
      item.toolName ||
      item.tool ||
      item.type ||
      item.name ||
      "AI Tool"
    );
  };

  // -----------------------------
  // Get title
  // -----------------------------
  const getTitle = (item) => {
    if (item.historyType === "chat") {
      return (
        item.title ||
        item.prompt ||
        item.message ||
        item.userMessage ||
        "AI Chat"
      );
    }

    return (
      item.title ||
      item.toolName ||
      item.tool ||
      item.type ||
      "AI Tool"
    );
  };

  // -----------------------------
  // Get description
  // -----------------------------
  const getDescription = (item) => {
    if (item.historyType === "chat") {
      return (
        item.response ||
        item.aiResponse ||
        item.answer ||
        item.result ||
        "No response available."
      );
    }

    return (
      item.input ||
      item.prompt ||
      item.content ||
      item.result ||
      item.output ||
      "Tool activity"
    );
  };

  // -----------------------------
  // Delete single history
  // -----------------------------
  const handleDelete = async (item) => {
    if (!item.backendId) {
      showMessage(
        "Unable to delete this history item.",
        "error"
      );
      return;
    }

    try {
      setDeletingId(item.backendId);

      let endpoint = "";

      if (item.historyType === "chat") {
        endpoint = `${API_BASE}/api/ai/history/${item.backendId}`;
      } else {
        endpoint = `${API_BASE}/api/tool-history/${item.backendId}`;
      }

      await axios.delete(
        endpoint,
        getAuthConfig()
      );

      if (item.historyType === "chat") {
        setChatHistory((prev) =>
          prev.filter(
            (historyItem) =>
              (historyItem._id ||
                historyItem.id ||
                historyItem.historyId) !==
              item.backendId
          )
        );
      } else {
        setToolHistory((prev) =>
          prev.filter(
            (historyItem) =>
              (historyItem._id ||
                historyItem.id ||
                historyItem.historyId) !==
              item.backendId
          )
        );
      }

      showMessage(
        "History deleted successfully.",
        "success"
      );
    } catch (error) {
      console.error(
        "Delete History Error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to delete history.",
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // -----------------------------
  // Clear current history
  // -----------------------------
  const handleClearHistory = async () => {
    if (currentHistory.length === 0) {
      showMessage(
        "There is no history to clear.",
        "info"
      );
      return;
    }

    try {
      setLoading(true);

      if (activeTab === 0) {
        await Promise.all(
          normalizedChatHistory
            .filter((item) => item.backendId)
            .map((item) =>
              axios.delete(
                `${API_BASE}/api/ai/history/${item.backendId}`,
                getAuthConfig()
              )
            )
        );

        setChatHistory([]);
      } else {
        await Promise.all(
          normalizedToolHistory
            .filter((item) => item.backendId)
            .map((item) =>
              axios.delete(
                `${API_BASE}/api/tool-history/${item.backendId}`,
                getAuthConfig()
              )
            )
        );

        setToolHistory([]);
      }

      showMessage(
        "History cleared successfully.",
        "success"
      );
    } catch (error) {
      console.error(
        "Clear History Error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to clear history.",
        "error"
      );

      // Refresh so UI stays synced with backend
      await fetchHistory();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 78px)",
          px: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          py: {
            xs: 4,
            md: 6,
          },
          background:
            "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
        }}
      >
        <Box
          sx={{
            maxWidth: 1050,
            mx: "auto",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 5,
            }}
          >
            <Chip
              icon={<HistoryOutlinedIcon />}
              label="HISTORY"
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
              Your AI History
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                maxWidth: 650,
                mx: "auto",
              }}
            >
              View and manage your previous AI chats
              and tool activities.
            </Typography>
          </Box>

          {/* Main Card */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              borderRadius: 4,
              background:
                "rgba(15, 23, 42, 0.82)",
              border:
                "1px solid rgba(99, 102, 241, 0.2)",
              backdropFilter: "blur(18px)",
            }}
          >
            {/* Tabs + Actions */}
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{
                xs: "stretch",
                md: "center",
              }}
              sx={{ mb: 3 }}
            >
              <Tabs
                value={activeTab}
                onChange={(_, value) =>
                  setActiveTab(value)
                }
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    color: "#94a3b8",
                    fontWeight: 700,
                  },

                  "& .Mui-selected": {
                    color: "#818cf8 !important",
                  },

                  "& .MuiTabs-indicator": {
                    background:
                      "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  },
                }}
              >
                <Tab
                  icon={<ChatOutlinedIcon />}
                  iconPosition="start"
                  label={`Chats (${chatHistory.length})`}
                />

                <Tab
                  icon={<BuildOutlinedIcon />}
                  iconPosition="start"
                  label={`Tools (${toolHistory.length})`}
                />
              </Tabs>

              <Stack
                direction="row"
                spacing={1}
                justifyContent={{
                  xs: "space-between",
                  md: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={
                    <RefreshOutlinedIcon />
                  }
                  onClick={fetchHistory}
                  disabled={loading}
                  sx={{
                    color: "#c7d2fe",
                    borderColor:
                      "rgba(129, 140, 248, 0.35)",
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  Refresh
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={
                    <DeleteIcon />
                  }
                  onClick={handleClearHistory}
                  disabled={
                    loading ||
                    currentHistory.length === 0
                  }
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </Stack>

            <Divider
              sx={{
                borderColor:
                  "rgba(148, 163, 184, 0.1)",
                mb: 3,
              }}
            />

            {/* Loading */}
            {loading ? (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <CircularProgress
                  sx={{ color: "#818cf8" }}
                />

                <Typography
                  sx={{ color: "#94a3b8" }}
                >
                  Loading your history...
                </Typography>
              </Box>
            ) : currentHistory.length === 0 ? (
              /* Empty */
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  px: 2,
                }}
              >
                {activeTab === 0 ? (
                  <ChatOutlinedIcon
                    sx={{
                      fontSize: 60,
                      color: "#475569",
                      mb: 2,
                    }}
                  />
                ) : (
                  <BuildOutlinedIcon
                    sx={{
                      fontSize: 60,
                      color: "#475569",
                      mb: 2,
                    }}
                  />
                )}

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    mb: 0.7,
                  }}
                >
                  No{" "}
                  {activeTab === 0
                    ? "chat"
                    : "tool"}{" "}
                  history yet
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    maxWidth: 450,
                  }}
                >
                  Your previous{" "}
                  {activeTab === 0
                    ? "AI conversations"
                    : "AI tool activities"}{" "}
                  will appear here.
                </Typography>
              </Box>
            ) : (
              /* History List */
              <Stack spacing={2}>
                {currentHistory.map(
                  (item, index) => (
                    <Paper
                      key={
                        item.backendId ||
                        `${item.historyType}-${index}`
                      }
                      elevation={0}
                      sx={{
                        p: {
                          xs: 2,
                          sm: 2.5,
                        },
                        borderRadius: 3,
                        background:
                          "rgba(2, 6, 23, 0.42)",
                        border:
                          "1px solid rgba(148, 163, 184, 0.1)",
                        transition:
                          "all 0.25s ease",
                        "&:hover": {
                          borderColor:
                            "rgba(129, 140, 248, 0.35)",
                          transform:
                            "translateY(-2px)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                      >
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 45,
                            height: 45,
                            minWidth: 45,
                            borderRadius: 2,
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "rgba(99, 102, 241, 0.12)",
                            color: "#818cf8",
                          }}
                        >
                          {item.historyType ===
                          "chat" ? (
                            <ChatOutlinedIcon />
                          ) : (
                            <BuildOutlinedIcon />
                          )}
                        </Box>

                        {/* Content */}
                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Stack
                            direction={{
                              xs: "column",
                              sm: "row",
                            }}
                            spacing={1}
                            alignItems={{
                              xs: "flex-start",
                              sm: "center",
                            }}
                            sx={{ mb: 0.7 }}
                          >
                            <Typography
                              sx={{
                                color:
                                  "#ffffff",
                                fontWeight: 800,
                                wordBreak:
                                  "break-word",
                              }}
                            >
                              {getTitle(item)}
                            </Typography>

                            {item.historyType ===
                              "tool" && (
                              <Chip
                                size="small"
                                label={getToolName(
                                  item
                                )}
                                sx={{
                                  color:
                                    "#c7d2fe",
                                  background:
                                    "rgba(99, 102, 241, 0.12)",
                                  fontSize:
                                    "0.7rem",
                                }}
                              />
                            )}
                          </Stack>

                          <Typography
                            sx={{
                              color:
                                "#94a3b8",
                              fontSize:
                                "0.88rem",
                              lineHeight: 1.6,
                              display:
                                "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient:
                                "vertical",
                              overflow:
                                "hidden",
                              wordBreak:
                                "break-word",
                            }}
                          >
                            {getDescription(
                              item
                            )}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={0.7}
                            alignItems="center"
                            sx={{ mt: 1.2 }}
                          >
                            <AccessTimeOutlinedIcon
                              sx={{
                                fontSize: 16,
                                color:
                                  "#64748b",
                              }}
                            />

                            <Typography
                              sx={{
                                color:
                                  "#64748b",
                                fontSize:
                                  "0.75rem",
                              }}
                            >
                              {formatDate(
                                item.createdAt ||
                                  item.updatedAt ||
                                  item.date
                              )}
                            </Typography>
                          </Stack>
                        </Box>

                        {/* Delete */}
                        <IconButton
                          onClick={() =>
                            handleDelete(
                              item
                            )
                          }
                          disabled={
                            deletingId ===
                            item.backendId
                          }
                          sx={{
                            color: "#f87171",
                            flexShrink: 0,
                            "&:hover": {
                              background:
                                "rgba(239, 68, 68, 0.1)",
                            },
                          }}
                        >
                          {deletingId ===
                          item.backendId ? (
                            <CircularProgress
                              size={20}
                              color="inherit"
                            />
                          ) : (
                           <DeleteIcon />
                          )}
                        </IconButton>
                      </Stack>
                    </Paper>
                  )
                )}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={message.open}
        autoHideDuration={3500}
        onClose={closeMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={message.severity}
          variant="filled"
          onClose={closeMessage}
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

export default History;