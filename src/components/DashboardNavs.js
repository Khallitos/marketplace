import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#3c3939",
};

const DashboardLinkDesign = {
  height: "50px",
  "&:hover": {
    backgroundColor: "#black",
  },
};

export default function DashboardNavs() {
  return (
    <Box sx={DashboardLinkDesign}>
      {/* <Box><Link href="/user/uploadsong">Upload Song</Link></Box>
        
       <Box><Link href="/user/profile">Profile</Link></Box> 
       <Box><Link href="/user/songstats">Songstats</Link></Box> 
       <Box><Link href="songstats/editsong">Edit Songs</Link></Box>  */}

      <List sx={style} component="nav" aria-label="mailbox folders">
        <Divider />
        <Link
          href="/user/dashboard"
          style={{ textDecoration: "none", color: "orange" }}
        >
          <ListItem button divider>
            <Button variant="" startIcon={<DashboardIcon />}>
              Dashboard
            </Button>
          </ListItem>
        </Link>
        <Link
          href="/user/uploadsong"
          style={{ textDecoration: "none", color: "orange" }}
        >
          <ListItem button divider>
            <Button variant="" startIcon={<UploadFileIcon />}>
              Upload Song
            </Button>
          </ListItem>
        </Link>
        <Link
          href="/user/profile"
          style={{ textDecoration: "none", color: "orange" }}
        >
          <ListItem button>
            <Button variant="" startIcon={<AccountCircleIcon />}>
              Profile
            </Button>
          </ListItem>
        </Link>

        <Divider light />
        <Link
          href="/user/editsong"
          style={{ textDecoration: "none", color: "orange" }}
        >
          <ListItem button>
            <Button variant="" startIcon={<UploadFileIcon />}>
              Edit Song
            </Button>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
