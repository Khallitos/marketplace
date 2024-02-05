import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAppContext } from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  TextField,
  Typography,
} from "@mui/material";

import { ProductValidationSchema } from "../validations/ProductValidationSchema";
const formText = {
  fontSize: "100px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  textColor: "white",
  backgroundColor: "white",
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ProductForm = () => {
  const {
    setStep,
    productData,
    setProductData,
    isSideBarReduce,
    toggleSideBar,
    showAlert,
    parcel,
    parcelType,
    setFinalData,
    finalData,
  } = useAppContext();

  const [isNegotiable, setIsNegotiable] = useState("");

  const NegotiableCheckBox = () => {
   
    setProductData({ ...productData, Negotiable: "Yes" });
  };

  const ProductValidation = async (e) => {
    const ProductFormData = {
      Location: productData["Location"],
      Title: productData["Title"],
      productType: productData["productType"],
      Description: productData["Description"],
      Price: productData["Price"],
    };

    const isValid = await ProductValidationSchema.isValid(ProductFormData);


    if(isValid) {
      if(parcelChecker === "Double"){
        const pushFinalData = setFinalData({
          ...finalData,
          ...vesselFormData,
        });
        setStep(2)
      }
      else if(parcelChecker ==="Single"){
        const pushFinalData = setFinalData({
          ...finalData,
          ...vesselFormData,
        });
        setStep(3)
      }
      else{
        setStep(2)
      }
  
    } else {
      toast.error("Invalid credentials", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

  
   
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" ,marginX:"100px", width:"50%",alignContent:"center",justifyContent:"center"}}>
      <ToastContainer />
      {/* *************************************************************************NAME OF VESSEL***************************************************************************** */}
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
        Product Details
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      {/* {isError &&
      <Typography autoFocus variant="h6" sx={{marginTop:"10px", fontWeight:"bold",color:"red",  display:"flex",
          justifyContent: "center",
          alignItems: "center" }}>
      Please provide all details
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
} */}


<Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      <Typography variant="p">
        Location
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="Location"
        id="outlined-basic"
        label="Location"
        variant="outlined"
        value={productData["Location"]}
        onChange={(e) =>
          setProductData({ ...productData, Location: e.target.value })
        }
      />
      <Typography variant="p" sx={{ marginTop: "10px" }}>
        Title
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>

      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        autoFocus
        name="Title"
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={productData["Title"]}
        onChange={(e) =>
          setProductData({ ...productData, Title: e.target.value })
        }
      />


      {/* *************************************************************************TYPE OF PRODUCT***************************************************************************** */}
      <FormControl sx={{ width: "300px" }}>
        <InputLabel id="demo-simple-select-helper-label"></InputLabel>
        <Typography variant="p">
          Type of Product
          <Typography component="span" sx={{ color: "red" }}>
            *
          </Typography>
        </Typography>
        <Select
          value={productData["productType"]}
          displayEmpty
          name="productType"
          label="Product Type"
          onChange={(e) =>
            setProductData({ ...productData, productType: e.target.value })
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Gasoil">Gasoil</MenuItem>
          <MenuItem value="Gasoiline">Gasoline</MenuItem>
          <MenuItem value="Gasoiline">HFO</MenuItem>
          <MenuItem value="Bitumen">Bitumen</MenuItem>
        </Select>
      </FormControl>

     
      <Typography variant="p" sx={{ marginTop: "30px" }}>
        <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
       Negotiable
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>

      <Typography variant="p" color="initial">
        Check if not available
        <Checkbox
          {...label}
          onChange={NegotiableCheckBox}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </Typography>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />

      {/* *************************************************************************ARRIVAL FIGURES***************************************************************************** */}

     

      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      <Typography variant="p">
        Description
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="Description"
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={productData["Description"]}
        onChange={(e) =>
          setProductData({ ...productData, Description: e.target.value })
        }
      />

<Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      <Typography variant="p">
        Price
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="Price"
        id="outlined-basic"
        label="Price"
        variant="outlined"
        value={productData["Price"]}
        onChange={(e) =>
          setProductData({ ...productData, Price: e.target.value })
        }
      />

      
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={ProductValidation}>Next</Button>
      </Box>
    </Box>
  );
};


export default ProductForm;
