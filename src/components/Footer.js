import React from 'react'
import { Box, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';

const footerDesign = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    display:"flex",
    justifyContent: "space-around",
    height:"60px",
    backgroundColor:"#3c3939"
}

const footerButtonDesign = {
    display:"flex",
    flexDirection:"column"
}

const Footer = () => {

  return (
    <Box sx={footerDesign}>
        <Box>
            <Box sx={{marginBottom:"1px"}}><LocalFireDepartmentIcon sx={{color:"orange"}}/></Box>
            <Typography variant='p'>Trends</Typography>
        </Box>

        <Box>
            <Box sx={{marginBottom:"1px"}}><SearchIcon/></Box>
            <Typography variant='p'>Search</Typography>
        </Box>

        <Box>
            <Box sx={{marginBottom:"1px"}}><DashboardIcon/></Box>
            <Typography variant='p'>Dashboard</Typography>
        </Box>
    </Box>
  )
}

export default Footer