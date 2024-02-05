import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import * as yup from "yup";
import Divider from "@mui/material/Divider";
import { useAppContext } from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { receivingVesselSchema2 } from "../validations/receivingVesselSchema2";

const formText = {
  fontSize: "100px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  textColor: "white",

  backgroundColor: "white",
};
const ReceivingForm = () => {
  const {
    setStep,
    vesselData,
    cargoData2,
    finalData,
    setIsCompleted,
    isCompleted,
    setVesselData,
    setCargoData,
    setCargoData2,
    setFinalData,
    isSideBarReduce,
    toggleSideBar,
    showAlert,
    addSingleParcelDetails,
    addDoubleParcelDetails,
    parcel,
    parcelType,
  } = useAppContext();
  const router = useRouter();

  let parcelChecker = parcel.parcelType;

  const ReceivingFormValidation = async (e) => {
    e.preventDefault();
    const ReceivingTerminalDetails2 = {
      receivingTerminalGOV: cargoData2["receivingTerminalGOV"],
      receivingTerminal: cargoData2["receivingTerminal"],
      receivingTerminalDensity: cargoData2["receivingTerminalDensity"],
      receivingTerminalWCF: cargoData2["receivingTerminalWCF"],
      receivingTerminalTemperature: cargoData2["receivingTerminalTemperature"],
      receivingTerminalVCF: cargoData2["receivingTerminalVCF"],
      receivingTerminalGSV: cargoData2["receivingTerminalGSV"],
      receivingTerminalMTVAC: cargoData2["receivingTerminalMTVAC"],
      receivingTerminalMTAIR: cargoData2["receivingTerminalMTAIR"],
      receivingTerminalGSV20: cargoData2["receivingTerminalGSV20"],
      receivingTerminalMTVAC20: cargoData2["receivingTerminalMTVAC20"],
      receivingTerminalMTAIR20: cargoData2["receivingTerminalMTAIR20"],
      mogsFlowmeterReading: cargoData2["mogsFlowmeterReading"],
      mogsTerminalDensity20: cargoData2["mogsTerminalDensity20"],
      mogsTerminalVCF: cargoData2["mogsTerminalVCF"],
      mogsTerminalGSV20: cargoData2["mogsTerminalGSV20"],
      mogsTerminalMTVAC20: cargoData2["mogsTerminalMTVAC20"],
      mogsTerminalMTAIR20: cargoData2["mogsTerminalMTAIR20"],
    };
    try {
      const isValidReceivingTerminalDetails2 = await receivingVesselSchema2.isValid(ReceivingTerminalDetails2);
      if (isValidReceivingTerminalDetails2) {
        const newTerminalArray = finalData.terminalDetails || [];
        if (newTerminalArray) {
          newTerminalArray.push(ReceivingTerminalDetails2);
          setFinalData({
            ...finalData,
            terminalDetails: newTerminalArray,
          });

          if (parcel.parcelType === "Single") {
           const isParcelDetailsValid  = addSingleParcelDetails({ vesselData: { ...finalData, terminalDetails: newTerminalArray } });
           
           if(isParcelDetailsValid){
            setIsCompleted(true);
           }
           else {
            toast.error("Invalid credentials", {
              position: toast.POSITION.TOP_RIGHT,
            });
           }
            
          } else if (parcel.parcelType === "Double") {
            console.log(finalData)
            const isParcelDetailsValid = addDoubleParcelDetails({ vesselData: { ...finalData, terminalDetails: newTerminalArray }});
            if(isParcelDetailsValid){
              setIsCompleted(true);
            }
            
          }
        } else {
          toast.error("Invalid credentials", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("Invalid credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        toast.error("IIIInvalid credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      else {
        toast.error("Invalid credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
  
    if(isCompleted){
      setFinalData("");
      setVesselData("");
      setCargoData("");
      setCargoData2("");
      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  
  }, [ isCompleted]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ToastContainer />

      {/* *************************************************************************RECEIVING TERMINAL***************************************************************************** */}
      <Typography
        variant="p"
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBotttom: "10px",
        }}
      >
        RECEIVING TERMINAL DETAILS
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************RECEIVING TERMINAL ***************************************************************************** */}
      <FormControl sx={{ width: "300px", marginTop: "10px" }}>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Typography variant="p">
          Receiving Terminal
          <Typography component="span" sx={{ color: "red" }}>
            *
          </Typography>
        </Typography>
        <Select
          value={cargoData2["receivingTerminal"]}
          onChange={(e) =>
            setCargoData2({ ...cargoData2, receivingTerminal: e.target.value })
          }
          name="receivingTerminal"
          label="Receiving Terminal"
          autoFocus
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="ZEN TERMINALS">ZEN TERMINALS</MenuItem>
          <MenuItem value="GHANSTOCK">GHANSTOCK</MenuItem>
          <MenuItem value="BLUEOCEAN">BLUEOCEAN</MenuItem>
          <MenuItem value="VIVO ENERGY">VIVO ENERGY</MenuItem>
          <MenuItem value="TOTAL ENERGY">TOTAL ENERGY</MenuItem>
        </Select>
      </FormControl>

      {/* {isError && (
        <Typography
          autoFocus
          variant="h6"
          sx={{
            marginTop: "10px",
            fontWeight: "bold",
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Please provide all details
          <Typography
            component="span"
            sx={{ color: "red", marginBottom: "0px" }}
          >
            *
          </Typography>
        </Typography>
      )} */}
      <Typography
        variant="p"
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        OUTURN @15
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************GOV***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        GOV(CBM)
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>

      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalGOV"
        id="outlined-basic"
        label="GOV"
        variant="outlined"
        value={cargoData2["receivingTerminalGOV"]}
        onChange={(e) =>
          setCargoData2({ ...cargoData2, receivingTerminalGOV: e.target.value })
        }
      />

      {/* *************************************************************************DENSITY***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        DENSITY @15
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>

      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalDensity"
        id="outlined-basic"
        label="DENSITY @15"
        variant="outlined"
        value={cargoData2["receivingTerminalDensity"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalDensity: e.target.value,
          })
        }
      />

      {/* *************************************************************************WCF***************************************************************************** */}

      <Typography variant="p" sx={{ marginTop: "10px" }}>
        WCF
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalWCF"
        id="outlined-basic"
        label="WCF"
        variant="outlined"
        value={cargoData2["receivingTerminalWCF"]}
        onChange={(e) =>
          setCargoData2({ ...cargoData2, receivingTerminalWCF: e.target.value })
        }
      />

      {/* *************************************************************************AVERAGE TEMPERATURE***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        AVERAGE TEMPERATURE
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalTemperature"
        id="outlined-basic"
        label="AVERAGE TEMPERATURE"
        variant="outlined"
        value={cargoData2["receivingTerminalTemperature"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalTemperature: e.target.value,
          })
        }
      />

      {/* *************************************************************************VCF***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        VCF
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalVCF"
        id="outlined-basic"
        label="VCF"
        variant="outlined"
        value={cargoData2["receivingTerminalVCF"]}
        onChange={(e) =>
          setCargoData2({ ...cargoData2, receivingTerminalVCF: e.target.value })
        }
      />

      {/* *************************************************************************GSV @15***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        GSV
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalGSV"
        id="outlined-basic"
        label="GSV"
        variant="outlined"
        value={cargoData2["receivingTerminalGSV"]}
        onChange={(e) =>
          setCargoData2({ ...cargoData2, receivingTerminalGSV: e.target.value })
        }
      />

      {/* *************************************************************************METRIC TONNES VAC***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        METRIC TONNES VAC
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalMTVAC"
        id="outlined-basic"
        label="MT VAC"
        variant="outlined"
        value={cargoData2["receivingTerminalMTVAC"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalMTVAC: e.target.value,
          })
        }
      />

      {/* *************************************************************************METRIC TONNES AIR***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        MT AIR
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalMTAIR"
        id="outlined-basic"
        label="MT AIR"
        variant="outlined"
        value={cargoData2["receivingTerminalMTAIR"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalMTAIR: e.target.value,
          })
        }
      />

      <Typography
        variant="p"
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        OUTURN @20
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************GSV @20***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        GSV @20
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalGSV20"
        id="outlined-basic"
        label="GSV "
        variant="outlined"
        value={cargoData2["receivingTerminalGSV20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalGSV20: e.target.value,
          })
        }
      />

      {/* *************************************************************************MT VAC***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        MT VAC
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalMTVAC20"
        id="outlined-basic"
        label="MT VAC "
        variant="outlined"
        value={cargoData2["receivingTerminalMTVAC20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalMTVAC20: e.target.value,
          })
        }
      />

      {/* *************************************************************************MT AIR***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        MT AIR
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="receivingTerminalMTAIR20"
        id="outlined-basic"
        label="MT VAC "
        variant="outlined"
        value={cargoData2["receivingTerminalMTAIR20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            receivingTerminalMTAIR20: e.target.value,
          })
        }
      />

      {/* *************************************************************************RECEIVING TERMINAL***************************************************************************** */}
      <Typography
        variant="p"
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBotttom: "10px",
        }}
      >
        MOGS TERMINAL DETAILS
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************Flow***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        FLOW METER READING
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsFlowmeterReading"
        id="outlined-basic"
        label="Flow meter reading"
        variant="outlined"
        value={cargoData2["mogsFlowmeterReading"]}
        onChange={(e) =>
          setCargoData2({ ...cargoData2, mogsFlowmeterReading: e.target.value })
        }
      />

      {/* *************************************************************************GSV @20***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        Density @20
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsTerminalDensity20"
        id="outlined-basic"
        label="Density "
        variant="outlined"
        value={cargoData2["mogsTerminalDensity20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            mogsTerminalDensity20: e.target.value,
          })
        }
      />

      {/* *************************************************************************VCF***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        VCF
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsTerminalVCF"
        id="outlined-basic"
        label="VCF"
        variant="outlined"
        value={cargoData2["mogsTerminalVCF"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            mogsTerminalVCF: e.target.value,
          })
        }
      />

      <Typography
        variant="p"
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        OUTURN @20
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************GSV ***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        GSV
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsTerminalGSV20"
        id="outlined-basic"
        label="MT VAC "
        variant="outlined"
        value={cargoData2["mogsTerminalGSV20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            mogsTerminalGSV20: e.target.value,
          })
        }
      />

      {/* *************************************************************************MT VAC***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        MT VAC
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsTerminalMTVAC20"
        id="outlined-basic"
        label="MT VAC "
        variant="outlined"
        value={cargoData2["mogsTerminalMTVAC20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            mogsTerminalMTVAC20: e.target.value,
          })
        }
      />

      {/* *************************************************************************MT AIR***************************************************************************** */}
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        MT AIR
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="mogsTerminalMTAIR20"
        id="outlined-basic"
        label="MT VAC "
        variant="outlined"
        value={cargoData2["mogsTerminalMTAIR20"]}
        onChange={(e) =>
          setCargoData2({
            ...cargoData2,
            mogsTerminalMTAIR20: e.target.value,
          })
        }
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            parcelChecker === "Double" ? setStep(2) : setStep(1);
          }}
        >
          Back
        </Button>
        <Button onClick={ReceivingFormValidation}>Completed</Button>
      </Box>
    </Box>
  );
};

export default ReceivingForm;
