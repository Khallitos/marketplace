import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import * as yup from "yup";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import { useRouter } from "next/router";
import { ComputerFormSchema } from "../validations/ComputerFormSchema";
import { useAppContext } from "../../context/AppContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ProductType from "@/utils/productType";

import condition from "@/utils/condition";

const formText = {
  fontSize: "100px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  textColor: "white",
  backgroundColor: "white",
};

const ProductDetailsForm = () => {
  const {
    setStep,
    productData,
    cargoData2,
    finalData,
    setIsCompleted,
    isCompleted,
    setProductData,
    setFinalData,
    ProductTypeInfo,
    PopulatedSubcategory

  } = useAppContext();

  const ProductFormValidation = async (e) => {
    e.preventDefault();
    const ProductDetails = {
      receivingTerminalGOV: cargoData2["receivingTerminalGOV"],
      receivingTerminal: cargoData2["receivingTerminal"],
      
    };
    try {
      const isValidProductDetails =
        await ProductDetailsValidationSchema.isValid(ProductDetails);

      // } else {
      //   toast.error("Invalid credentials", {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      // }
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        toast.error("IIIInvalid credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Invalid credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {});

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ToastContainer />

        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-helper-label"></InputLabel>
          <Typography variant="p">
            SubCategory
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <Select
            value={productData["SubCategory"] || ""}
            displayEmpty
            name="SubCategory"
            label="SubCategory"
            onChange={(e) =>
              setProductData({ ...productData, SubCategory: e.target.value })
            }
          >
            {PopulatedSubcategory?.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
            ;
          </Select>
        </FormControl>

        <Typography variant="p" sx={{ marginTop: "10px" }}>
          Brand
          <Typography
            component="span"
            sx={{ color: "red", marginBottom: "0px" }}
          >
            *
          </Typography>
        </Typography>

        <TextField
          sx={formText}
          margin="normal"
          required
          fullWidth
          autoFocus
          name="Brand"
          id="outlined-basic"
          label="Brand"
          variant="outlined"
          value={productData["Brand"]}
          onChange={(e) =>
            setProductData({ ...productData, Brand: e.target.value })
          }
        />

        <Typography variant="p" sx={{ marginTop: "10px" }}>
          Description
          <Typography
            component="span"
            sx={{ color: "red", marginBottom: "0px" }}
          >
            *
          </Typography>
        </Typography>

        <TextField
          sx={formText}
          margin="normal"
          required
          fullWidth
          autoFocus
          name="Description"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={productData["Description"]}
          onChange={(e) =>
            setProductData({ ...productData, Description: e.target.value })
          }
        />

        <Typography variant="p" sx={{ marginTop: "10px" }}>
          Price
          <Typography
            component="span"
            sx={{ color: "red", marginBottom: "0px" }}
          >
            *
          </Typography>
        </Typography>

        <TextField
          sx={formText}
          margin="normal"
          required
          fullWidth
          autoFocus
          name="Price"
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={productData["Price"]}
          onChange={(e) =>
            setProductData({ ...productData, Price: e.target.value })
          }
        />
         <Box sx={{display:"flex"}}>
          <Typography variant="p">Swap Allowed</Typography>
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Required"
            />
          </FormGroup>
        </Box>

        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-helper-label"></InputLabel>
          <Typography variant="p">
            Condition
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <Select
            value={productData["Condition"] || ""}
            displayEmpty
            name="Condition"
            label="Condition"
            onChange={(e) =>
              setProductData({ ...productData, Condition: e.target.value })
            }
          >
            {condition.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
            ;
          </Select>
        </FormControl>

        <Box sx={{display:"flex"}}>
          <Typography variant="p">Negotiable</Typography>
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Required"
            />
          </FormGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setStep(1);
            }}
          >
            Back
          </Button>
          <Button onClick={ProductFormValidation}>Completed</Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailsForm;
