import React, { useState } from "react";
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
import { receivingVesselSchema } from "../validations/receivingVesselSchema";

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
    cargoData,
    setCargoData,
    finalData,
    setFinalData,
    isSideBarReduce,
    toggleSideBar,
    showAlert,
    addSingleCargoDetails,
  } = useAppContext();

  const ReceivingFormValidation = async (e) => {
    e.preventDefault();

    try{
    const receivingTerminalDetails = {
      terminalDetails: [
        {
          receivingTerminalGOV: cargoData["receivingTerminalGOV"],
          receivingTerminal: cargoData["receivingTerminal"],
          receivingTerminalDensity: cargoData["receivingTerminalDensity"],
          receivingTerminalWCF: cargoData["receivingTerminalWCF"],
          receivingTerminalTemperature:cargoData["receivingTerminalTemperature"],
          receivingTerminalVCF: cargoData["receivingTerminalVCF"],
          receivingTerminalGSV: cargoData["receivingTerminalGSV"],
          receivingTerminalMTVAC: cargoData["receivingTerminalMTVAC"],
          receivingTerminalMTAIR: cargoData["receivingTerminalMTAIR"],
          receivingTerminalGSV20: cargoData["receivingTerminalGSV20"],
          receivingTerminalMTVAC20: cargoData["receivingTerminalMTVAC20"],
          receivingTerminalMTAIR20: cargoData["receivingTerminalMTAIR20"],
          mogsFlowmeterReading: cargoData["mogsFlowmeterReading"],
          mogsTerminalDensity20: cargoData["mogsTerminalDensity20"],
          mogsTerminalVCF: cargoData["mogsTerminalVCF"],
          mogsTerminalGSV20: cargoData["mogsTerminalGSV20"],
          mogsTerminalMTVAC20: cargoData["mogsTerminalMTVAC20"],
          mogsTerminalMTAIR20: cargoData["mogsTerminalMTAIR20"],
        },
      ],
    };

    const isValidReceivingTerminalDetails = await receivingVesselSchema.isValid(
      receivingTerminalDetails
    );


    if (isValidReceivingTerminalDetails) {
      setFinalData({
        ...finalData,
        ...receivingTerminalDetails,
      })
      setStep(3);
    } else {
      toast.error("Please fill the data with valid credentials", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

catch(e){
  if (e instanceof yup.ValidationError) {
    console.log(e.message)
  }
}
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ToastContainer />
      {/* *************************************************************************RECEIVING TERMINAL***************************************************************************** */}

      {/* *************************************************************************RECEIVING TERMINAL ***************************************************************************** */}

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
      <FormControl sx={{ width: "300px", marginTop: "10px" }}>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Typography variant="p">
          Receiving Terminal
          <Typography component="span" sx={{ color: "red" }}>
            *
          </Typography>
        </Typography>
        <Select
          value={cargoData["receivingTerminal"]}
          onChange={(e) =>
            setCargoData({ ...cargoData, receivingTerminal: e.target.value })
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
        value={cargoData["receivingTerminalGOV"]}
        onChange={(e) =>
          setCargoData({ ...cargoData, receivingTerminalGOV: e.target.value })
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
        value={cargoData["receivingTerminalDensity"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalWCF"]}
        onChange={(e) =>
          setCargoData({ ...cargoData, receivingTerminalWCF: e.target.value })
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
        value={cargoData["receivingTerminalTemperature"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalVCF"]}
        onChange={(e) =>
          setCargoData({ ...cargoData, receivingTerminalVCF: e.target.value })
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
        value={cargoData["receivingTerminalGSV"]}
        onChange={(e) =>
          setCargoData({ ...cargoData, receivingTerminalGSV: e.target.value })
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
        value={cargoData["receivingTerminalMTVAC"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalMTAIR"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalGSV20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalMTVAC20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["receivingTerminalMTAIR20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["mogsFlowmeterReading"]}
        onChange={(e) =>
          setCargoData({ ...cargoData, mogsFlowmeterReading: e.target.value })
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
        value={cargoData["mogsTerminalDensity20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["mogsTerminalVCF"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["mogsTerminalGSV20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["mogsTerminalMTVAC20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
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
        value={cargoData["mogsTerminalMTAIR20"]}
        onChange={(e) =>
          setCargoData({
            ...cargoData,
            mogsTerminalMTAIR20: e.target.value,
          })
        }
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setStep(1)}>Back</Button>
        <Button onClick={ReceivingFormValidation}>Next</Button>
      </Box>
    </Box>
  );
};


export default ReceivingForm;
