import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  AutoAwesome,
  RocketLaunch,
  Security,
} from "@mui/icons-material";

import "../styles/Hero.css";

function Hero() {
  return (
    <Box className="hero-section">
      <Container maxWidth="xl">

        <Box className="hero-content">

          {/* LEFT CONTENT */}
          <Box className="hero-text">

            <Chip
              icon={<AutoAwesome />}
              label="Powered by Artificial Intelligence"
              className="hero-chip"
            />

            <Typography
              component="h1"
              className="hero-title"
            >
              Your All-in-One
              <br />

              <span className="gradient-text">
                AI Workspace
              </span>
            </Typography>

            <Typography className="hero-description">
              Chat, create, write, summarize, translate,
              code and explore the power of AI — all from
              one beautiful workspace.
            </Typography>

            {/* BUTTONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              className="hero-buttons"
            >
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                className="primary-hero-btn"
              >
                Start Creating Free
              </Button>

              <Button
                variant="outlined"
                startIcon={<RocketLaunch />}
                className="secondary-hero-btn"
              >
                Explore AI Tools
              </Button>
            </Stack>

            {/* TRUST INFO */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              className="hero-trust"
            >
              <Box className="trust-item">
                <Security />
                <Typography>
                  Secure
                </Typography>
              </Box>

              <Box className="trust-item">
                <AutoAwesome />
                <Typography>
                  AI Powered
                </Typography>
              </Box>

              <Box className="trust-item">
                <RocketLaunch />
                <Typography>
                  Easy to Use
                </Typography>
              </Box>
            </Stack>

          </Box>

          {/* RIGHT AI VISUAL */}
          <Box className="hero-visual">

            <Box className="orb-glow" />

            <Box className="ai-orb">

              <AutoAwesome className="orb-icon" />

              <Box className="orb-ring ring-one" />
              <Box className="orb-ring ring-two" />

            </Box>

            {/* FLOATING CARDS */}

            <Box className="floating-card floating-one">
              <AutoAwesome />
              <Typography>
                AI Chat
              </Typography>
            </Box>

            <Box className="floating-card floating-two">
              <RocketLaunch />
              <Typography>
                AI Tools
              </Typography>
            </Box>

            <Box className="floating-card floating-three">
              <Security />
              <Typography>
                Secure AI
              </Typography>
            </Box>

          </Box>

        </Box>

      </Container>
    </Box>
  );
}

export default Hero;