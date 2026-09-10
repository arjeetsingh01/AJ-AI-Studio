import { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const text = message.trim();

    if (!text || loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Please login to use AJ AI Chat.",
        },
      ]);

      return;
    }

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://aj-ai-studio-backend.onrender.com",
        {
          message: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: response.data.chat.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text:
              response.data.message ||
              "Something went wrong.",
          },
        ]);
      }
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            error.response?.data?.message ||
            "Unable to connect to AJ AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 78px)",
        background:
          "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
        display: "flex",
        flexDirection: "column",
        px: { xs: 1.5, sm: 3, md: 5 },
        py: { xs: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
            },
          }}
        >
          AI Chat
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
            mt: 0.5,
          }}
        >
          Chat with AJ AI and get intelligent answers.
        </Typography>
      </Box>

      {/* Chat Area */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          flex: 1,
          minHeight: {
            xs: 450,
            md: 560,
          },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 4,
          background: "rgba(15, 23, 42, 0.78)",
          border:
            "1px solid rgba(99, 102, 241, 0.22)",
          backdropFilter: "blur(18px)",
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 42,
              height: 42,
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            <SmartToyOutlinedIcon />
          </Avatar>

          <Box>
            <Typography
              sx={{
                color: "white",
                fontWeight: 700,
              }}
            >
              AJ AI Assistant
            </Typography>

            <Typography
              sx={{
                color: "#22c55e",
                fontSize: "0.8rem",
              }}
            >
              ● Online
            </Typography>
          </Box>

          <Box sx={{ ml: "auto" }}>
            <IconButton
              onClick={handleNewChat}
              disabled={loading}
              sx={{
                color: "#94a3b8",
                border:
                  "1px solid rgba(148,163,184,0.15)",
              }}
            >
              <AddRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor:
              "rgba(148,163,184,0.1)",
          }}
        />

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: {
              xs: 2,
              sm: 3,
            },
            py: 3,
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                minHeight: 350,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:
                  "center",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  mb: 2,
                  background:
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow:
                    "0 0 35px rgba(99,102,241,0.35)",
                }}
              >
                <SmartToyOutlinedIcon
                  sx={{ fontSize: 36 }}
                />
              </Avatar>

              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: 700,
                }}
              >
                How can I help you?
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  mt: 1,
                  maxWidth: 500,
                }}
              >
                Ask anything, brainstorm ideas,
                explain concepts, write content,
                or get help with your code.
              </Typography>
            </Box>
          ) : (
            <>
              {messages.map(
                (item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        item.type === "user"
                          ? "flex-end"
                          : "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "flex-start",
                        gap: 1,
                        maxWidth: {
                          xs: "90%",
                          sm: "75%",
                        },
                        flexDirection:
                          item.type === "user"
                            ? "row-reverse"
                            : "row",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          background:
                            item.type ===
                            "user"
                              ? "#334155"
                              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        }}
                      >
                        {item.type ===
                        "user" ? (
                          <PersonOutlineOutlinedIcon fontSize="small" />
                        ) : (
                          <SmartToyOutlinedIcon fontSize="small" />
                        )}
                      </Avatar>

                      <Paper
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: 3,
                          background:
                            item.type ===
                            "user"
                              ? "rgba(99,102,241,0.2)"
                              : "rgba(30,41,59,0.8)",
                          color: "white",
                        }}
                      >
                        <Typography
                          sx={{
                            whiteSpace:
                              "pre-wrap",
                            wordBreak:
                              "break-word",
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                )
              )}

              {/* Loading */}
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      background:
                        "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    }}
                  >
                    <SmartToyOutlinedIcon fontSize="small" />
                  </Avatar>

                  <Paper
                    elevation={0}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 3,
                      background:
                        "rgba(30,41,59,0.8)",
                    }}
                  >
                    <CircularProgress
                      size={18}
                    />
                  </Paper>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Input */}
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 3,
            },
            py: 2,
            borderTop:
              "1px solid rgba(148,163,184,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems:
                "flex-end",
              gap: 1,
              p: 1,
              borderRadius: 3,
              background:
                "rgba(2,6,23,0.7)",
              border:
                "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Message AJ AI..."
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              disabled={loading}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                  px: 1,
                },
                "& textarea::placeholder": {
                  color: "#64748b",
                  opacity: 1,
                },
              }}
            />

            <Button
              onClick={handleSend}
              variant="contained"
              disabled={
                loading ||
                !message.trim()
              }
              sx={{
                minWidth: 48,
                width: 48,
                height: 48,
                borderRadius: 2.5,
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5, #7c3aed)",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={22}
                  sx={{ color: "white" }}
                />
              ) : (
                <SendRoundedIcon />
              )}
            </Button>
          </Box>

          <Typography
            sx={{
              color: "#475569",
              fontSize: "0.72rem",
              textAlign: "center",
              mt: 1,
            }}
          >
            AJ AI Studio • AI responses are currently simulated
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default AIChat;