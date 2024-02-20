import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material/";
import { PersonIcon, LockIcon, AccountCircleIcon } from "@mui/icons-material/";
import { useAppContext } from "../../context/AppContext";
import { Alert, Subfooter } from "../../components";
import bg from "../../../public/images/bg.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

const dashboard = () => {
    const router = useRouter();
    const [isloading,setIsLoading] = useState(true)
     

    useEffect(()=> {
        const isTest = localStorage.getItem("isTest");
       

        if (isTest) {
            // setIsLoading(false);
          
        } 
        else {
            router.push("/");
          
        }
    })
    if (isloading)
    return (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <div>dashboard</div>
  )
}

export default dashboard