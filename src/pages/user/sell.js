import React, {useEffect, useState} from 'react'
import { Box, Step, StepLabel } from '@mui/material';
import Stepper from "@mui/material/Stepper";
import ProductForm from "../../components/forms/ProductForm";
import ProductDetailsForm from '@/components/forms/ProductDetailsForm';
import { useAppContext } from '@/context/AppContext';


const Sell = () => {
   
const dashboardDesign = {
    display: "flex",
    marginTop: "50px",
  };
  
  const loginbutton = {
    width: "300px",
    marginTop: "10px",
    fontWeight: "bold",
    backgroundColor: "#1c2c54",
    color: "white",
  
    "&:hover": {
      backgroundColor: "#24b4eb ",
      color: "white",
    },
  };
  
  const formDesign = {
    borderRadius: "10px solid #1976d2 !important",
    borderTop: "3px solid #24b4eb",
    margin: "auto",
    padding: "20px",
    color: "black",
    backgroundColor: "#fff",
  };
  const dischargeHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
  };
  const SingledischargeHeader = {
    display: "flex",
    marginBottom: "15px",
    marginTop: "30px",
  };
  //textfield
  const formText = {
    fontSize: "100px",
    width: "300px",
    textColor: "white",
  
    backgroundColor: "white",
  };
  
  
  
  
  const {currentStep,setStep} = useAppContext()

  const showStep = (step) => {
    switch (step) {
      case 1:
        return <ProductForm />;

      case 2:
        return <ProductDetailsForm />;
    }
  };

useEffect(()=>{
  
})
  return (
    <Box sx={dashboardDesign}>
            
            <Box sx={{ width: "100%", marginBottom: "20px", marginTop:"100px" }}>

              <Stepper
                style={{ width: "100%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <Step>
                  <StepLabel></StepLabel>
                </Step>

                <Step>
                  <StepLabel></StepLabel>
                </Step>

              </Stepper>
              {showStep(currentStep)}
            </Box>
         
    </Box>
  )
}

export default Sell