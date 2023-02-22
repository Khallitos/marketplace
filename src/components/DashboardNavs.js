import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const DashboardLinkDesign = {
  display: "flex",
  height: "50px",
  backgroundColor:"red"

 
};
export default function DashboardNavs() {
  return (
    <div sx={DashboardLinkDesign}>
      {/* <Box><Link href="/user/uploadsong">Upload Song</Link></Box>
        
       <Box><Link href="/user/profile">Profile</Link></Box> 
       <Box><Link href="/user/songstats">Songstats</Link></Box> 
       <Box><Link href="songstats/editsong">Edit Songs</Link></Box>  */}

      <List sx={style} component="nav" aria-label="mailbox folders">
        <Divider />

        <ListItem button divider>
          <Link href="/user/dashboard">
             <Button variant="" startIcon={<DashboardIcon />}>
              Dashboard
            </Button>
          </Link>
        </ListItem>

        <ListItem button divider>
          <Link href="/user/uploadsong">
             <Button variant="" startIcon={<UploadFileIcon />}>
              Upload Song
            </Button>
          </Link>
        </ListItem>
        
        <ListItem button>
        <Link href="/user/profile">
             <Button variant="" startIcon={<AccountCircleIcon />} >
              Profile
            </Button>
          </Link>
        </ListItem>

        <Divider light />
        <ListItem button>
        <Link href="/user/editsong">
             <Button variant="" startIcon={<UploadFileIcon />} >
              Edit Song
            </Button>
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
