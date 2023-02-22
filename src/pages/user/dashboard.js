import React from 'react'
import Box from '@mui/material/Box';
import { fontFamily, fontWeight } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { useAppContext } from "../../context/AppContext";
import { DashboardNavs } from '@/components';

const Dashboard = () => {
  const {
    token,
  } = useAppContext();
  
  const pageDesign = {
    display: "flex",
    flexDirection: "row",
    width:"800px",
    marginTop:"100px",
    overflow: "hidden",
    position: "fixed",
    height: "100%",

    marginX:{
      
    }
    
  }

  const mainpage = {
     display:"flex",
     flexDirection:"row",
     marginLeft:"100px"

  }
//   if(!token) return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%", transform:"translate(-50%, -50%)"}} />
   
  return (
    <Box sx={pageDesign}>
      <Box sx={{backgroundColor:"white", width:"300px"}}><DashboardNavs/></Box>
    <Box sx={mainpage}>
    <Box>1</Box>
    <Box>2</Box>
        
      </Box>
     </Box>
     
  )
}

export default Dashboard