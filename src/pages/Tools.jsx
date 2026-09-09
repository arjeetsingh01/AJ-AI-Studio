import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  AutoAwesome,
  Bolt,
  Code,
  Description,
  Email,
  Image,
  Translate,
  Psychology,
  ArrowForward,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import "../styles/Tools.css";

function Tools() {
  const navigate = useNavigate();

  const tools = [
    {
      icon: <Psychology />,
      title: "AI Chat",
      description:
        "Ask questions, brainstorm ideas and have intelligent conversations with AI.",
      path: "/ai-chat",
    },
    {
      icon: <Description />,
      title: "AI Summarizer",
      description:
        "Turn long articles, notes and documents into clear and useful summaries.",
      path: "/summarizer",
    },
    {
      icon: <Translate />,
      title: "AI Translator",
      description:
        "Translate your text between multiple languages quickly and naturally.",
      path: "/translator",
    },
    {
      icon: <Description />,
      title: "Resume Builder",
      description:
        "Create a professional resume with AI-powered content and suggestions.",
      path: "/resume-builder",
    },
    {
      icon: <Email />,
      title: "Email Writer",
      description:
        "Write professional emails faster with intelligent AI assistance.",
      path: "/email-writer",
    },
    {
      icon: <Code />,
      title: "Code Assistant",
      description:
        "Generate, explain, debug and improve your code with AI.",
      path: "/code-assistant",
    },
    {
      icon: <Image />,
      title: "Image Generator",
      description:
        "Turn your creative ideas and prompts into unique AI-generated images.",
      path: "/image-generator",
    },
    {
      icon: <Description />,
      title: "Document Q&A",
      description:
        "Upload documents and ask questions to quickly find the information you need.",
      path: "/document-qa",
    },
  ];

  return (
    <Box id="tools" className="tools-section">
      <Container maxWidth="xl">

        {/* HEADER */}
       <Stack
  spacing={2}
  className="tools-header"
  sx={{
    alignItems: "center",
    textAlign: "center",
  }}
>
          <Box className="tools-badge">
            <AutoAwesome />
            <Typography>
              AI POWERED TOOLS
            </Typography>
          </Box>

          <Typography
            component="h2"
            className="tools-title"
          >
            Powerful Tools.
            <br />
            <span>One AI Workspace.</span>
          </Typography>

          <Typography className="tools-description">
            Everything you need to create, learn, write,
            code and work smarter with AI.
          </Typography>
        </Stack>

        {/* TOOLS GRID */}
        <Grid
          container
          spacing={3}
          className="tools-grid"
        >
          {tools.map((tool, index) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
              key={tool.title}
            >
              <Card
                className="tool-card"
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
                onClick={() => navigate(tool.path)}
              >
                <CardContent className="tool-card-content">

                  {/* ICON */}
                  <Box className="tool-icon">
                    {tool.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography
                    component="h3"
                    className="tool-title"
                  >
                    {tool.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography className="tool-description">
                    {tool.description}
                  </Typography>

                  {/* ACTION */}
                  <Button
                    endIcon={<ArrowForward />}
                    className="tool-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(tool.path);
                    }}
                  >
                    Try Tool
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* BOTTOM INFO */}
        <Box className="tools-bottom">
          <Bolt />

          <Typography>
            More intelligent tools are coming to AJ AI Studio.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}

export default Tools;