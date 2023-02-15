import React, { useEffect, useState } from "react";
import {
  red,
  SearchIcon,
  InputBase,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Button,
  Hidden,
  Divider,
  styled,
  alpha,
} from "@mui/material/";
import MenuIcon from '@mui/icons-material/Menu';

import {
  GpsFixed,
  AccountCircleIcon,
  CloudDownloadIcon,
  SettingsIcon,
} from "@mui/icons-material/";

import { useAppContext } from "../context/AppContext";
import Head from "next/head";
import Link from "next/link";
import links from "../utils/links";

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
  const { username, logUserOff,token } = useAppContext();
  const logoutUser = () => {
      logUserOff()
      window.location.reload();
    };

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

        </Toolbar>
      </AppBar>
    </Box>
     
    </> 
  );
}

export default Navbar