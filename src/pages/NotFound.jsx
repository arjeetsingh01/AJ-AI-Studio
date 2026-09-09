import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 78px)",
        px: 2,
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, #1e1b4b, #070a12 50%, #020617)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 650,
          p: { xs: 3, sm: 5, md: 7 },
          textAlign: "center",
          borderRadius: 5,
          background: "rgba(15, 23, 42, 0.82)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 25px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <Box
            sx={{
              width: 85,
              height: 85,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "rgba(99, 102, 241, 0.12)",
              border:
                "1px solid rgba(129, 140, 248, 0.3)",
              boxShadow:
                "0 0 40px rgba(99, 102, 241, 0.18)",
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{
                fontSize: 48,
                color: "#818cf8",
              }}
            />
          </Box>

          <Typography
            sx={{
              color: "#818cf8",
              fontWeight: 900,
              fontSize: {
                xs: "5rem",
                sm: "7rem",
              },
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: {
                xs: "1.7rem",
                sm: "2.2rem",
              },
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              maxWidth: 480,
              lineHeight: 1.7,
              fontSize: "0.95rem",
            }}
          >
            The page you're looking for doesn't exist or
            may have been moved to another location.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              width: "100%",
              maxWidth: 420,
              mt: 2,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<HomeOutlinedIcon />}
              onClick={() => navigate("/")}
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
              Back to Home
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              onClick={() => navigate(-1)}
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: 700,
                color: "#cbd5e1",
                borderColor:
                  "rgba(148, 163, 184, 0.3)",
              }}
            >
              Go Back
            </Button>
          </Stack>

          <Typography
            sx={{
              color: "#475569",
              fontSize: "0.78rem",
              mt: 2,
            }}
          >
            AJ AI Studio • Designed & Developed by Arjeet Singh
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default NotFound;