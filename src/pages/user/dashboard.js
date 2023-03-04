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
import { Subfooter } from "@/components";

const pageDesign = {
  marginTop: "60px",
  marginX: {
    lg: 10,
    md: 10,
    xl: 10,
    sm: 2,
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
  display:"flex",
  flexDirection: {
    xs:"column",
    lg:"row",
    md:"row",
    xl:"row",
    sm:"row"
  }
};
const mobileDesign = {
  flexDirection: "row",
  marginX: "auto",
  display: {
    lg: "none",
    md: "none",
    xl: "none",
    sm: "none",
    xs: "flex",
  },
};
const DashboardDesign = {
  display: {
    xs: "none",
    sm: "none",
    xl: "flex",
    md: "flex",
    lg: "none",
  },
};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#3c3939",
};

const sideMenu = {
  display: {
    xs: "none",
    xl: "flex",
    md: "flex",
    sm: "flex",
    lg: "flex",
  },
};
const mainpage = {
  display: "flex",
  flexDirection: "row",
  marginLeft: "100px",
};
const Dashboard = () => {
  //   if(!token) return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%", transform:"translate(-50%, -50%)"}} />

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={pageDesign}>
          <Box sx={mobileDesign}>
            <Box sx={{ marginRight: "10px" }}>
              <Link href="/user/dashboard" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "orange",
                    backgroundColor: "#3c3939",
                    variant: "contained",
                  }}
                  startIcon={<DashboardIcon />}
                >
                  Dashboard
                </Button>
              </Link>
            </Box>

            <Box sx={{ marginRight: "10px" }}>
              <Link href="/upload" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<UploadFileIcon />}
                  sx={{
                    color: "orange",
                    backgroundColor: "#3c3939",
                    variant: "contained",
                  }}
                >
                  Upload
                </Button>
              </Link>
            </Box>

            <Box sx={{ marginRight: "10px" }}>
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    color: "orange",
                    backgroundColor: "#3c3939",
                    variant: "contained",
                  }}
                >
                  profile
                </Button>
              </Link>
            </Box>
            <Box sx={{ marginRight: "10px" }}>
              <Link href="/editsong" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<UploadFileIcon />}
                  sx={{
                    color: "orange",
                    backgroundColor: "#3c3939",
                    variant: "contained",
                  }}
                >
                  Edit
                </Button>
              </Link>
            </Box>
          </Box>

          <Box sx={sideMenu}>
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
          <Box sx={{display:"flex", marginTop:"30px", marginLeft:"50px"}}>
            <Box
              sx={{
                border: "10px solid #1976d2",
                width: "100px",
                height: "100px",
                backgroundColor: "#1976d2",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "white",
                borderRadius: "10px ",
              }}
            >
              Total Downloads
            </Box>
            <Box
              sx={{
                border: "10px solid #7fe792",
                width: "100px",
                height: "100px",
                backgroundColor: "#7fe792",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {" "}
              Pending songs
            </Box>
            <Box
              sx={{
                border: "10px solid #f96161",
                width: "100px",
                height: "100px",
                backgroundColor: "#f96161",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "nexa",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Live songs
            </Box>
          </Box>
        </Box>
      </Box>
      <Subfooter />
    </>
  );
};

export default Dashboard;
