import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";
import { Button, Hidden, Divider } from "@mui/material";
import { GpsFixed } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import links from "../utils/links";
// import SET_INITIALSTATE from "../context/"

const phoneNavbar = {
  flexGrow: 1,
  display: { lg: "none", md: "none", xl: "none", xs: "flex", sm: "flex" },
  backgroundColor: "#e6e6e6",
  marginTop: "10px",
  "@media (max-width: 900px)": {},
};

const linkStyle = {
  textDecoration: "none",
};
const MainBox = {
  marginX: {
    lg: 15,
    xl: 30,
  },
  marginBottom: {
    lg: 10,
    xl: 10,
    md: 15,
  },

  backgroundColor: red,
};
const pages = ["Afrobeats", "Hiphop", "Amapiano", "Highlife", "Gospel"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  margin: "50px",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const { username, logUserOff, token, setLocalStorage } = useAppContext();
  const router = useRouter();
  const logoutUser = () => {
    logUserOff();
    window.location.reload();
  };

  
useEffect(()=>{
  setLocalStorage()
 },[])

  return (
    <>
      <Box sx={MainBox}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                KANMUSIC
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {links.map((link) => (
                <Link href={link.path} style={{ textDecoration: "none" }}>
                  <Button
                    key={link.id}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {link.title}
                  </Button>
                </Link>
              ))}
            </Box>
            {token && (
              <>
                <Typography variant="h5">
                  <AccountCircleIcon fontSize="small" /> {username}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={logoutUser}
                  sx={{
                    backgroundColor: "white",
                    marginX: "30px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "2px",
                  }}
                >
                  Logout
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => router.push("/")}
                >
                  <SettingsIcon fontSize="large" sx={{ color: "white" }} />
                </Button>
              </>
            )}

            {!token && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/login")}
                  sx={{
                    backgroundColor: "white",
                    marginX: "30px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "2px",
                    "&:hover": {
                      borderRadius:"10px solid blue",
                      color:"black",
                      background:"white",
                      width:"100px"
                    }

                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
