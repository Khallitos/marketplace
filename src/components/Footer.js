import React from 'react'
import { Box, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';

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
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"

}

const Footer = () => {

  return (
    <Box sx={footerDesign}>
       
        <Box sx={footerButtonDesign}>
            <LocalFireDepartmentIcon sx={{fontSize:"30px", color:"orange"}}  />
            <Typography variant='p' sx={{fontSize:"13px"}}>Trends</Typography>
        </Box>

        <Box sx={footerButtonDesign}>
            <LanguageIcon sx={{fontSize:"30px"}}  />
            <Typography variant='p' sx={{fontSize:"13px"}}>Search</Typography>
        </Box>

        <Box sx={footerButtonDesign}>
            <DashboardIcon sx={{fontSize:"30px"}}  />
            <Typography variant='p' sx={{fontSize:"13px"}}>Lib</Typography>
        </Box>
        
    </Box>
  )
}

export default Footer