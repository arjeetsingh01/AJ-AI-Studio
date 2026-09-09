import { Box } from "@mui/material";

import Hero from "./Hero.jsx";
import Features from "./FeatureCard.jsx";
import Tools from "./Tools.jsx";
import About from "./About.jsx";

import "../styles/Home.css";

function Home() {
  return (
    <Box className="home-page">

      <Hero />

      <Features />

      <Tools />

      <About />

    </Box>
  );
}

export default Home;