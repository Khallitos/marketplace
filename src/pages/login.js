import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material/";
import { PersonIcon, LockIcon, AccountCircleIcon } from "@mui/icons-material/";
import { useAppContext } from "../context/AppContext";
import { Alert } from "../components/Alert";
import bg from '../../public/images/bg.jpg'
// import {Link} from "react-router-dom"
// import { useNavigate } from "react-router-dom";

const RegisterBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: {
    lg: "center",
    xs: "",
  },
  justifyContent: "center",
  paddingX: "2px",
  marginX: {
    lg: "25%",
    md: "25%",
    xl: "25%",
    sm: "20",
  },
  marginTop: {
    lg: "10%",
    md: "10%",
    xl: "10%",
    sm: "30%",
    xs: "30%",
  },
  width: {
    sm: "400px",
    lg: "600px",
    xl: "800px",
  },
  


};


//textfield
const formText = {
  fontSize: "100px",
  width:"300px"
};

//
const FormOuterCover = {
 

}

//
const formDesign= {
  borderRadius:"10px solid #1976d2 !important",
  border:"3px solid #1976d2 !important",
  padding: "20px",
  backgroundColor:"white"
}


//login button
const loginbutton ={
  width:"300px",
  marginTop:"10px"
}

//
const LoginText = {
  display :"flex",
  alignItems:"center",
  justifyContent:"center"
}

// state for form

const initialState = {
  email: "",
  password: "",
};

export default function login() {
  //   const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { displayEmptyErr, showAlert, loginUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const logUser = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email) {
      displayEmptyErr();
      return;
    }

    const userDetails = { email, password };
    loginUser({ userDetails, alertText: "login successful" });

    // navigate("/")
  };
  return (
   
    <Box sx={RegisterBox}>
      {showAlert && <Alert />}
      <Box sx={formDesign}>
      <form >
        <Typography variant="h4" sx={LoginText}>Login</Typography>

        {/* email */}
        <Box>
        <TextField
          sx={formText}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email "
          name="email"
          value={values.email}
          autoComplete="email"
          onChange={handleChange}
          autoFocus
        />
        </Box>

        {/* password */}

        <Box>
        <TextField
          sx={formText}
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          value={values.password}
          autoComplete="password"
          autoFocus
          onChange={handleChange}
        />
        </Box>
        <Box>
        <Button variant="contained" onClick={logUser} sx={loginbutton}>
          Login
        </Button>
        </Box>
      </form>
      {/* <Link to = "/forgotpassword" >Forgot password</Link>
      <Link to = "/register" >Register</Link> */}
    </Box>
    </Box>
 
  );
}
