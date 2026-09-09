import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  AutoAwesome,
  CheckCircle,
  Psychology,
  Speed,
  WorkspacePremium,
} from "@mui/icons-material";

import "../styles/About.css";

function About() {
  const benefits = [
    {
      icon: <Psychology />,
      title: "Smart AI Experience",
      text: "Powerful AI features designed to make your everyday work simpler.",
    },
    {
      icon: <Speed />,
      title: "Fast & Simple",
      text: "Move from idea to result quickly with an easy-to-use workspace.",
    },
    {
      icon: <WorkspacePremium />,
      title: "One Workspace",
      text: "Keep multiple AI tools together instead of switching between platforms.",
    },
  ];

  return (
    <Box id="about" className="about-section">
      <Container maxWidth="xl">

       <Grid
  container
  spacing={{ xs: 6, md: 10 }}
  sx={{
    alignItems: "center",
  }}
>

          {/* LEFT CONTENT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="about-content">

              <Box className="about-badge">
                <AutoAwesome />
                <Typography>
                  ABOUT AJ AI STUDIO
                </Typography>
              </Box>

              <Typography
                component="h2"
                className="about-title"
              >
                One Place For
                <br />
                <span>Everything AI.</span>
              </Typography>

              <Typography className="about-description">
                AJ AI Studio is designed as an all-in-one AI workspace
                where you can chat, write, summarize, translate, code,
                create and work with documents from one simple platform.
              </Typography>

              <Typography className="about-description">
                Our goal is simple — make powerful AI tools easier to
                discover, easier to use and available together in one
                beautiful workspace.
              </Typography>

              <Stack spacing={1.5} className="about-check-list">

                <Box className="about-check">
                  <CheckCircle />
                  <Typography>
                    Multiple AI tools in one platform
                  </Typography>
                </Box>

                <Box className="about-check">
                  <CheckCircle />
                  <Typography>
                    Clean and responsive experience
                  </Typography>
                </Box>

                <Box className="about-check">
                  <CheckCircle />
                  <Typography>
                    Built for learning, creating and productivity
                  </Typography>
                </Box>

              </Stack>

            </Box>
          </Grid>

          {/* RIGHT VISUAL */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="about-visual">

              <Box className="about-glow" />

              <Box className="about-panel">

                <Box className="about-panel-top">
                  <Box className="about-dot" />
                  <Box className="about-dot" />
                  <Box className="about-dot" />
                </Box>

                <Box className="about-panel-content">

                  <Box className="about-main-icon">
                    <AutoAwesome />
                  </Box>

                  <Typography className="about-panel-title">
                    AJ AI Studio
                  </Typography>

                  <Typography className="about-panel-text">
                    Your intelligent workspace
                  </Typography>

                  <Box className="about-mini-grid">

                    <Box className="about-mini-card">
                      <Psychology />
                      <span>AI Chat</span>
                    </Box>

                    <Box className="about-mini-card">
                      <Speed />
                      <span>Fast AI</span>
                    </Box>

                    <Box className="about-mini-card">
                      <WorkspacePremium />
                      <span>AI Tools</span>
                    </Box>

                    <Box className="about-mini-card">
                      <CheckCircle />
                      <span>Secure</span>
                    </Box>

                  </Box>

                </Box>

              </Box>

              <Box className="about-floating-card about-floating-one">
                <AutoAwesome />
                <Typography>
                  AI Powered
                </Typography>
              </Box>

              <Box className="about-floating-card about-floating-two">
                <CheckCircle />
                <Typography>
                  All In One
                </Typography>
              </Box>

            </Box>
          </Grid>

        </Grid>

        {/* BENEFITS */}
        <Box className="about-benefits">

          {benefits.map((benefit) => (
            <Box
              className="about-benefit-card"
              key={benefit.title}
            >
              <Box className="about-benefit-icon">
                {benefit.icon}
              </Box>

              <Typography className="about-benefit-title">
                {benefit.title}
              </Typography>

              <Typography className="about-benefit-text">
                {benefit.text}
              </Typography>
            </Box>
          ))}

        </Box>

      </Container>
    </Box>
  );
}

export default About;