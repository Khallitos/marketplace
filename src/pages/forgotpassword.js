import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material/";
import { PersonIcon, LockIcon } from "@mui/icons-material/";
import { AccountCircleIcon } from "@mui/icons-material/AccountCircle";
import { useAppContext } from "../context/AppContext";
import { Alert } from "../components";

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
};

export default function forgotpassword() {
  const [values, setValues] = useState(initialState);
  const { displayEmptyErr, showAlert,RestorePassword } = useAppContext();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const ForgotPwd= (e) => {
    e.preventDefault();

    const { email } = values;

    const userDetails = { email };
     RestorePassword({ email, alertText: "Email has been sent to " });
  };
  return (
    <Box sx={RegisterBox}>
      {showAlert && <Alert />}
      <Box sx={formDesign}>
        <form>
        <Typography variant="h5">Forgot Password</Typography>

        {/* email */}
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
        <Box>
        <Button variant="contained" onClick={ForgotPwd}>
          Reset Password
        </Button>
        </Box>
      </form>
    </Box>
    </Box>
  );
};

;
