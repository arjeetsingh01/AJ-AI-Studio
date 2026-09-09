import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        mt: 0,
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 5, md: 7 },
        pb: 3,
        background:
          "linear-gradient(180deg, #020617 0%, #070a12 100%)",
        borderTop:
          "1px solid rgba(99, 102, 241, 0.18)",
        overflow: "hidden",
      }}
    >
      {/* Top Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 300,
          height: 200,
          borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.12)",
          filter: "blur(80px)",
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
        <Grid container spacing={5}>
          {/* Brand */}
          <Grid xs={12} md={5}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow:
                      "0 8px 25px rgba(99,102,241,0.3)",
                  }}
                >
                  <AutoAwesomeOutlinedIcon
                    sx={{ color: "#ffffff" }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                  }}
                >
                  AJ AI Studio
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#94a3b8",
                  maxWidth: 430,
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                }}
              >
                Your all-in-one AI workspace for chatting,
                writing, coding, translating, summarizing and
                creating with AI.
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Designed & Developed by{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#818cf8",
                    fontWeight: 800,
                  }}
                >
                  Arjeet Singh Yadav
                </Box>
              </Typography>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid xs={6} sm={4} md={2}>
            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 800,
                  mb: 0.5,
                }}
              >
                Quick Links
              </Typography>

              <Link
                component={RouterLink}
                to="/"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Home
              </Link>

              <Link
                component={RouterLink}
                to="/features"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Features
              </Link>

              <Link
                component={RouterLink}
                to="/tools"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Tools
              </Link>

              <Link
                component={RouterLink}
                to="/about"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                About
              </Link>
            </Stack>
          </Grid>

          {/* AI Tools */}
          <Grid xs={6} sm={4} md={2}>
            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 800,
                  mb: 0.5,
                }}
              >
                AI Tools
              </Typography>

              <Link
                component={RouterLink}
                to="/ai-chat"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                AI Chat
              </Link>

              <Link
                component={RouterLink}
                to="/summarizer"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Summarizer
              </Link>

              <Link
                component={RouterLink}
                to="/translator"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Translator
              </Link>

              <Link
                component={RouterLink}
                to="/code-assistant"
                underline="none"
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  "&:hover": {
                    color: "#818cf8",
                  },
                }}
              >
                Code Assistant
              </Link>
            </Stack>
          </Grid>

          {/* Connect */}
          <Grid xs={12} sm={4} md={3}>
            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 800,
                  mb: 0.5,
                }}
              >
                Connect
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                }}
              >
                Have an idea or want to connect? Find me
                online.
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="GitHub"
                  sx={{
                    color: "#cbd5e1",
                    border:
                      "1px solid rgba(148,163,184,0.15)",
                    background:
                      "rgba(148,163,184,0.05)",
                    "&:hover": {
                      color: "#ffffff",
                      background:
                        "rgba(99,102,241,0.15)",
                      borderColor:
                        "rgba(129,140,248,0.4)",
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>

                <IconButton
                  aria-label="LinkedIn"
                  sx={{
                    color: "#cbd5e1",
                    border:
                      "1px solid rgba(148,163,184,0.15)",
                    background:
                      "rgba(148,163,184,0.05)",
                    "&:hover": {
                      color: "#ffffff",
                      background:
                        "rgba(99,102,241,0.15)",
                      borderColor:
                        "rgba(129,140,248,0.4)",
                    },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>

                <IconButton
                  aria-label="Email"
                  sx={{
                    color: "#cbd5e1",
                    border:
                      "1px solid rgba(148,163,184,0.15)",
                    background:
                      "rgba(148,163,184,0.05)",
                    "&:hover": {
                      color: "#ffffff",
                      background:
                        "rgba(99,102,241,0.15)",
                      borderColor:
                        "rgba(129,140,248,0.4)",
                    },
                  }}
                >
                  <EmailOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor:
              "rgba(148, 163, 184, 0.1)",
          }}
        />

        {/* Bottom */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#64748b",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            © 2026 Arjeet Singh Yadav. All rights reserved.
          </Typography>

          <Typography
            sx={{
              color: "#475569",
              fontSize: "0.78rem",
              textAlign: "center",
            }}
          >
            Built with React • MUI • AI
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;