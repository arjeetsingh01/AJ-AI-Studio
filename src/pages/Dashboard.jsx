import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tools = [
    {
      title: "AI Chat",
      description: "Chat with AJ AI and get instant responses.",
      icon: <ChatOutlinedIcon />,
      path: "/ai-chat",
    },
    {
      title: "AI Summarizer",
      description: "Summarize long text quickly and easily.",
      icon: <DescriptionOutlinedIcon />,
      path: "/summarizer",
    },
    {
      title: "AI Translator",
      description: "Translate content into multiple languages.",
      icon: <TranslateOutlinedIcon />,
      path: "/translator",
    },
    {
      title: "Code Assistant",
      description: "Generate and improve your code with AI.",
      icon: <CodeOutlinedIcon />,
      path: "/code-assistant",
    },
    {
      title: "Image Generator",
      description: "Turn your ideas into creative visuals.",
      icon: <ImageOutlinedIcon />,
      path: "/image-generator",
    },
    {
      title: "Email Writer",
      description: "Create professional emails in seconds.",
      icon: <EmailOutlinedIcon />,
      path: "/email-writer",
    },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to access your dashboard.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setDashboardData(response.data.dashboard);
        } else {
          setError("Failed to load dashboard.");
        }
      } catch (err) {
        console.error("Dashboard API Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to connect to the backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const totalChats =
    dashboardData?.stats?.totalChats || 0;

  const totalToolUsage =
    dashboardData?.stats?.totalToolUsage || 0;

  const totalActivity =
    dashboardData?.stats?.totalActivity || 0;

  const recentChats =
    dashboardData?.recentChats || [];

  const recentTools =
    dashboardData?.recentTools || [];

  const recentActivity = [
    ...recentChats.map((chat) => ({
      title: "AI Chat",
      text: chat.message,
      time: chat.createdAt,
      icon: <ChatOutlinedIcon />,
    })),

    ...recentTools.map((item) => ({
      title: item.tool,
      text: "Used AI tool",
      time: item.createdAt,
      icon:
        item.tool === "translator" ? (
          <TranslateOutlinedIcon />
        ) : item.tool === "code-assistant" ? (
          <CodeOutlinedIcon />
        ) : item.tool === "summarizer" ? (
          <DescriptionOutlinedIcon />
        ) : item.tool === "email-writer" ? (
          <EmailOutlinedIcon />
        ) : item.tool === "image-generator" ? (
          <ImageOutlinedIcon />
        ) : (
          <AutoAwesomeOutlinedIcon />
        ),
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.time) - new Date(a.time)
    )
    .slice(0, 5);

  const formatTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const activityDate = new Date(date);

    const difference =
      Math.floor(
        (now - activityDate) / 1000
      );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      return `${Math.floor(difference / 60)} min ago`;
    }

    if (difference < 86400) {
      return `${Math.floor(difference / 3600)} hour ago`;
    }

    return activityDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 78px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top right, #1e1b4b, #070a12 45%, #020617)",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <CircularProgress />
          <Typography sx={{ color: "#94a3b8" }}>
            Loading your AI workspace...
          </Typography>
        </Stack>
      </Box>
    );
  }

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
      <Box sx={{ maxWidth: 1250, mx: "auto" }}>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* Welcome */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(30,27,75,0.95), rgba(15,23,42,0.88))",
            border:
              "1px solid rgba(99,102,241,0.25)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            alignItems={{
              xs: "flex-start",
              md: "center",
            }}
            justifyContent="space-between"
            spacing={3}
          >
            <Box>
              <Chip
                icon={<AutoAwesomeOutlinedIcon />}
                label="AJ AI STUDIO"
                sx={{
                  mb: 2,
                  color: "#c7d2fe",
                  background:
                    "rgba(99,102,241,0.12)",
                  border:
                    "1px solid rgba(99,102,241,0.35)",
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
                    sm: "2.5rem",
                    md: "3rem",
                  },
                  mb: 1,
                }}
              >
                Welcome,{" "}
                {dashboardData?.user?.name ||
                  "AI User"} 👋
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  maxWidth: 680,
                  lineHeight: 1.7,
                }}
              >
                Everything you need to create,
                write, code and work smarter with
                AI — all in one place.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={
                <AutoAwesomeOutlinedIcon />
              }
              onClick={() =>
                navigate("/ai-chat")
              }
              sx={{
                px: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: 700,
                whiteSpace: "nowrap",
                background:
                  "linear-gradient(90deg, #6366f1, #8b5cf6)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #4f46e5, #7c3aed)",
                },
              }}
            >
              Start Creating
            </Button>
          </Stack>
        </Paper>

        {/* Statistics */}
        <Grid
          container
          spacing={2.5}
          sx={{ mb: 5 }}
        >
          {[
            [
              "8+",
              "AI Tools",
              <AutoAwesomeOutlinedIcon />,
            ],
            [
              totalActivity,
              "Total Activity",
              <TrendingUpOutlinedIcon />,
            ],
            [
              totalChats,
              "AI Chats",
              <ChatOutlinedIcon />,
            ],
            [
              totalToolUsage,
              "Tool Usage",
              <AccessTimeOutlinedIcon />,
            ],
          ].map(
            ([value, label, icon]) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                key={label}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background:
                      "rgba(15,23,42,0.78)",
                    border:
                      "1px solid rgba(99,102,241,0.18)",
                    backdropFilter:
                      "blur(14px)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        mb: 2,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        color: "#a5b4fc",
                        background:
                          "rgba(99,102,241,0.12)",
                      }}
                    >
                      {icon}
                    </Box>

                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1.7rem",
                      }}
                    >
                      {value}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#94a3b8",
                        fontSize: "0.9rem",
                        mt: 0.5,
                      }}
                    >
                      {label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>

        {/* Usage Overview */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              sm: 4,
            },
            mb: 5,
            borderRadius: 4,
            background:
              "rgba(15,23,42,0.78)",
            border:
              "1px solid rgba(99,102,241,0.18)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  mb: 0.5,
                }}
              >
                AI Usage Overview
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.9rem",
                }}
              >
                Your current workspace usage
              </Typography>
            </Box>

            {[
              [
                "AI Chat",
                totalChats,
              ],
              [
                "AI Tools",
                totalToolUsage,
              ],
              [
                "Total Activity",
                totalActivity,
              ],
              [
                "Workspace",
                100,
              ],
            ].map(
              ([name, value]) => {
                const maxValue =
                  Math.max(
                    totalActivity,
                    1
                  );

                const percentage =
                  name === "Workspace"
                    ? 100
                    : Math.min(
                        Math.round(
                          (value /
                            maxValue) *
                            100
                        ),
                        100
                      );

                return (
                  <Box key={name}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          fontSize: "0.9rem",
                        }}
                      >
                        {name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#818cf8",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {value}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 7,
                        borderRadius: 10,
                        background:
                          "rgba(148,163,184,0.1)",
                        "& .MuiLinearProgress-bar":
                          {
                            borderRadius: 10,
                            background:
                              "linear-gradient(90deg, #6366f1, #8b5cf6)",
                          },
                      }}
                    />
                  </Box>
                );
              }
            )}
          </Stack>
        </Paper>

        {/* Quick Access */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              mb: 0.5,
            }}
          >
            Quick Access
          </Typography>

          <Typography
            sx={{ color: "#64748b" }}
          >
            Choose an AI tool and start
            working.
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{ mb: 5 }}
        >
          {tools.map((tool) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={tool.title}
            >
              <Card
                elevation={0}
                onClick={() =>
                  navigate(tool.path)
                }
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  borderRadius: 4,
                  background:
                    "rgba(15,23,42,0.78)",
                  border:
                    "1px solid rgba(99,102,241,0.18)",
                  backdropFilter:
                    "blur(14px)",
                  transition:
                    "all 0.3s ease",

                  "&:hover": {
                    transform:
                      "translateY(-6px)",
                    borderColor:
                      "rgba(129,140,248,0.65)",
                    boxShadow:
                      "0 15px 45px rgba(79,70,229,0.18)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color: "#a5b4fc",
                        background:
                          "rgba(99,102,241,0.12)",
                        border:
                          "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      {tool.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 750,
                          fontSize:
                            "1.1rem",
                          mb: 0.7,
                        }}
                      >
                        {tool.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#94a3b8",
                          fontSize:
                            "0.9rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {tool.description}
                      </Typography>
                    </Box>

                    <Button
                      endIcon={
                        <ArrowForwardOutlinedIcon />
                      }
                      sx={{
                        alignSelf:
                          "flex-start",
                        color:
                          "#818cf8",
                        p: 0,
                        textTransform:
                          "none",
                        fontWeight: 700,
                        "&:hover": {
                          background:
                            "transparent",
                          color:
                            "#a5b4fc",
                        },
                      }}
                    >
                      Open Tool
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              sm: 4,
            },
            borderRadius: 4,
            background:
              "rgba(15,23,42,0.78)",
            border:
              "1px solid rgba(99,102,241,0.18)",
            backdropFilter:
              "blur(14px)",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  mb: 0.5,
                }}
              >
                Recent Activity
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.9rem",
                }}
              >
                Your latest AI workspace
                activity
              </Typography>
            </Box>

            {recentActivity.length ===
            0 ? (
              <Box
                sx={{
                  py: 4,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#64748b",
                  }}
                >
                  No recent activity yet.
                </Typography>
              </Box>
            ) : (
              recentActivity.map(
                (activity, index) => (
                  <Box
                    key={`${activity.title}-${activity.time}-${index}`}
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 2.5,
                      background:
                        "rgba(2,6,23,0.35)",
                      border:
                        "1px solid rgba(148,163,184,0.08)",
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 44,
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color: "#a5b4fc",
                        background:
                          "rgba(99,102,241,0.12)",
                      }}
                    >
                      {activity.icon}
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            "#ffffff",
                          fontWeight:
                            700,
                          fontSize:
                            "0.95rem",
                        }}
                      >
                        {activity.title}
                      </Typography>

                      <Typography
                        sx={{
                          color:
                            "#94a3b8",
                          fontSize:
                            "0.82rem",
                          mt: 0.3,
                          overflow:
                            "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {activity.text}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color:
                          "#64748b",
                        fontSize:
                          "0.75rem",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {formatTime(
                        activity.time
                      )}
                    </Typography>
                  </Box>
                )
              )
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;