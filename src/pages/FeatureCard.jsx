import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SpeedOutlinedIcon />,
      title: "Fast AI Responses",
      description:
        "Get quick and intelligent AI responses designed to help you complete tasks faster.",
      path: "/ai-chat",
    },
    {
      icon: <AppsOutlinedIcon />,
      title: "One AI Workspace",
      description:
        "Access multiple AI tools from one powerful and easy-to-use workspace.",
      path: "/dashboard",
    },
    {
      icon: <AutoAwesomeOutlinedIcon />,
      title: "Smart AI",
      description:
        "Use intelligent AI assistance for writing, coding, translation and everyday tasks.",
      path: "/ai-chat",
    },
    {
      icon: <HistoryOutlinedIcon />,
      title: "AI History",
      description:
        "Keep track of your previous AI conversations and generated results.",
      path: "/history",
    },
    {
      icon: <CodeOutlinedIcon />,
      title: "Code Assistant",
      description:
        "Write, explain, improve and debug code with an AI-powered coding assistant.",
      path: "/code-assistant",
    },
    {
      icon: <TranslateOutlinedIcon />,
      title: "AI Translator",
      description:
        "Translate your content into different languages quickly and easily.",
      path: "/translator",
    },
    {
      icon: <DescriptionOutlinedIcon />,
      title: "Document AI",
      description:
        "Ask questions about documents and get useful AI-powered answers.",
      path: "/document-qa",
    },
    {
      icon: <SecurityOutlinedIcon />,
      title: "Secure Workspace",
      description:
        "Manage your AI workspace and application preferences from one place.",
      path: "/settings",
    },
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="section"
      id="features"
      sx={{
        position: "relative",
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 7, md: 10 },
        background:
          "linear-gradient(180deg, #070a12 0%, #0a0d18 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-120px",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.10)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "-120px",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.08)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Stack
          spacing={2}
          className="features-header"
          sx={{
            alignItems: "center",
            textAlign: "center",
            mb: { xs: 5, md: 7 },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 10,
              border: "1px solid rgba(129, 140, 248, 0.25)",
              background: "rgba(99, 102, 241, 0.08)",
            }}
          >
            <Typography
              sx={{
                color: "#818cf8",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Powerful Features
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#ffffff",
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            Everything You Need,
            <Box
              component="span"
              sx={{
                display: "block",
                background:
                  "linear-gradient(90deg, #818cf8, #a78bfa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              In One AI Studio
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 680,
              fontSize: { xs: "0.92rem", md: "1rem" },
              lineHeight: 1.7,
            }}
          >
            AJ AI Studio brings powerful AI capabilities together
            in one modern workspace built for productivity,
            creativity and smarter work.
          </Typography>
        </Stack>

        {/* Feature Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {features.map((feature, index) => (
            <Grid
              key={feature.title}
              xs={12}
              sm={6}
              md={3}
            >
              <Card
                onClick={() => handleFeatureClick(feature.path)}
                sx={{
                  height: "100%",
                  minHeight: 245,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(7,10,18,0.95))",
                  border:
                    "1px solid rgba(148,163,184,0.10)",
                  boxShadow:
                    "0 15px 40px rgba(0,0,0,0.20)",
                  transition:
                    "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor:
                      "rgba(129,140,248,0.35)",
                    boxShadow:
                      "0 20px 55px rgba(79,70,229,0.18)",
                  },
                  "&:hover::before": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    p: { xs: 2.5, md: 3 },
                    "&:last-child": {
                      pb: { xs: 2.5, md: 3 },
                    },
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      height: "100%",
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#a5b4fc",
                        background:
                          "rgba(99,102,241,0.12)",
                        border:
                          "1px solid rgba(129,140,248,0.16)",
                        transition:
                          "all 0.3s ease",
                        ".MuiCard-root:hover &": {
                          background:
                            "rgba(99,102,241,0.20)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "1.05rem",
                        fontWeight: 800,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#94a3b8",
                        fontSize: "0.86rem",
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {feature.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                        color: "#818cf8",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                      }}
                    >
                      Explore
                      <ArrowForwardRoundedIcon
                        sx={{
                          fontSize: 17,
                          transition:
                            "transform 0.25s ease",
                          ".MuiCard-root:hover &": {
                            transform:
                              "translateX(4px)",
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          className="features-cta"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mt: { xs: 5, md: 7 },
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border:
              "1px solid rgba(99,102,241,0.16)",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                mb: 0.6,
              }}
            >
              Ready to explore your AI workspace?
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "0.88rem",
              }}
            >
              Discover all the AI tools available in AJ AI Studio.
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/tools")}
            sx={{
              flexShrink: 0,
              px: 2.5,
              py: 1.2,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow:
                "0 10px 25px rgba(99,102,241,0.25)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Explore AI Tools
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Features;