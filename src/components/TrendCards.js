import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useAppContext } from "../context/AppContext";
import PageBtn from "./PageBtn";
import Image from 'next/Image';
import { Box, Button, Modal, Typography } from "@mui/material";

const cardDesign = {
  minHeight: "4rem",
  display: "flex",
  width: {
    md: "100%",
    sm: "100%",
    lg: "100%",
    xl: "80%"
  },
  marginBottom:"20px",
  // "img" : {
  //   borderRadius: "1rem",
  //   left: "0",
  //   width: "120px",
  //   height: "100px",
  //   objectFit: "cover",
  //   filter: "brightness(70%)",
  // }
  
  "p": {
    fontWeight:"bold",
    textDecoration: "none",
  }
}
const img = {
  
    borderRadius: "5rem",
    left: "0",
    objectFit: "cover",
    filter: "brightness(70%)",
  }
const TrendCards = ({title,artist,Genre,description,songId,ImageKey}) => {
  const { getAllSongs, AllSongs, page, searchSong,deleteThisSong,approveThisSong,isPageReloaded} =
  useAppContext();

const [search, setSearch] = useState("");
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [openApprovals, setOpenApprovals] = React.useState(false);
const ApprovalPromptOpen = () => setOpenApprovals(true);
const ApprovalPromptClose = () => setOpenApprovals(false);

const Search = (e) => {
  searchSong(search);
};

const getSongs = () => {
  getAllSongs();
};
const deleteSong = (id) => {
  deleteThisSong(id);
  handleClose();
};
const approveSong = (id) => {
  approveThisSong(id)
  ApprovalPromptClose();
  
};
  return (
    <Card sx={cardDesign}>
    <Image
    sx={img}
    src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${ImageKey}`}  // Route of the image file
    height={100} // Desired size with correct aspect ratio
    width={100} // Desired size with correct aspect ratio
    alt="Your Name"
  />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {artist} - {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">

      </Typography>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">like</Button>
    </CardActions> */}
      {/* Review song */}          
  </Card>
  )
}

export default TrendCards
