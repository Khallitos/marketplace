import React from "react";
import { Box, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const footerDesign = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  backgroundColor: "red",
  color: "white",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  height: "60px",
  backgroundColor: "#3c3939",
};

const footerButtonDesign = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const footerTop = {
  marginTop: "45px",
  display:"flex",
  backgroundColor:"#3c3939",
  flexDirection:"column",
  marginBottom: "70px",
  alignItems: "center",
  justifyContent:"center",
  padding: {
    xs: "20px"
  },
  marginX: {
    xs:"auto"
  }
  

};

const Footer = () => {
  return (
    <Box>
        <Box sx={footerTop}>
        
            <Typography variant="p"> Copyright © Kanmusiz 2023.</Typography>
        </Box>
    <Box sx={footerDesign}>
      <Box sx={footerButtonDesign}>
        <LocalFireDepartmentIcon sx={{ fontSize: "30px", color: "orange" }} />
        <Typography variant="p" sx={{ fontSize: "13px" }}>
          Trends
        </Typography>
      </Box>

      <Box sx={footerButtonDesign}>
        <LanguageIcon sx={{ fontSize: "30px" }} />
        <Typography variant="p" sx={{ fontSize: "13px" }}>
          Search
        </Typography>
      </Box>

      <Box sx={footerButtonDesign}>
        <DashboardIcon sx={{ fontSize: "30px" }} />
        <Typography variant="p" sx={{ fontSize: "13px" }}>
          Lib
        </Typography>
      </Box>
    </Box>
    </Box>
  );
};

export default Footer;
