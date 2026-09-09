import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Navbar />

      <Box
        component="main"
        sx={{
          paddingTop: "78px",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </>
  );
}

export default Layout;