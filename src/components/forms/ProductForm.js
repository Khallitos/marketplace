import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
import { useAppContext } from "../../context/AppContext";
import ProductType from "@/utils/productType";
import ElectronicsSubCategory from "@/utils/ElectronicsSubcategory";

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
    setFinalData,
    finalData,
    ProductTypeInfo,
    ProductMatching,
  } = useAppContext();

  const [isNegotiable, setIsNegotiable] = useState("");
  const [isProductCategoryState, setProductCategoryState] = useState(false);

  const NegotiableCheckBox = () => {
    setProductData({ ...productData, Negotiable: "Yes" });
  };

  const ProductValidation = async (e) => {
    const ProductFormData = {
      Location: productData["Location"],
      Title: productData["Title"],
      ProductType: productData["ProductType"],
      Description: productData["Description"],
      Price: productData["Price"],
    };
    
    const setProductTypeInfo = productData["ProductType"];
    ProductMatching(setProductTypeInfo);
    setProductCategoryState(true);
    const isValid = await ProductValidationSchema.isValid(ProductFormData);

   

    if (isValid) {
      const pushFinalData = setFinalData({
        ...finalData,
        ...ProductFormData,
      });

      setStep(2);
    } else {
      toast.error("Invalid credentials", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (isProductCategoryState) {
      if(ProductTypeInfo === "Electronics & Electrical Appliances"){
       MatchProduct(ElectronicsSubCategory)
     
      }
    }
  }, [isProductCategoryState]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginX: "100px",
        width: "50%",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer />

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
          value={productData["ProductType"] || ""}
          displayEmpty
          name="ProductType"
          label="Product Type"
          onChange={(e) =>
            setProductData({ ...productData, ProductType: e.target.value })
          }
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {ProductType.map((product) => (
            <MenuItem key={product.id} value={product.title}>
              {product.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={ProductValidation}>Next</Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
