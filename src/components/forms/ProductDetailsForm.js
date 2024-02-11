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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ProductType, {
  laptopBrands,
  audioBrands,
  phoneBrands,
  homeApplianceBrands,
  tvBrands,
} from "@/utils/productType";

import condition from "@/utils/condition";

const formText = {
  fontSize: "100px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  textColor: "white",
  backgroundColor: "white",
};

const uploadButton = {
  width: "300px",
  color: "black",
  marginBottom: "5px",
  backgroundColor: "orange",
  "&:hover": {
    backgroundColor: "black",
    color: "orange",
  },
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
    MatchBrands,
    PopulatedSubcategory,
    Brand
  } = useAppContext();

  const [isBrand, setIsBrand] = useState(true);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isSwap, setIsSwap] = useState(true);

  const handleImageUpload = async (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage({
        ...image,
        file: file,
        userImage: reader.result,
        message: "",
      });
    };

    reader.readAsDataURL(file);
    // const newImagefile = e.target.files[0];
    // // const base64data = await getBase64.fromFile(newImagefile);
    // setImage(newImagefile);
  };

  const isNegotiableChecker = () => {
    setIsNegotiable(!isNegotiable)
    setProductData({...productData, Negotiable: isNegotiable})
  }

  const isSwapChecker = () => {
    setIsSwap(!isSwap)
    setProductData({...productData, Swapped: isSwap})
  }

  const matchBrand = (e) => {
    setProductData({ ...productData, SubCategory: e.target.value });
    const SubCategoryInfo = e.target.value;

    switch (SubCategoryInfo) {
      case "Audio & Video Equipment":
        setIsBrand(false);
        MatchBrands(audioBrands);
        break;

      case "Mobile Phones & Accessories":
        setIsBrand(false);
        MatchBrands(phoneBrands);
        break;

      case "Home Appliances":
        setIsBrand(false);
        MatchBrands(homeApplianceBrands);
        break;

      case "Computers & Accessories":
        setIsBrand(false);
        MatchBrands(laptopBrands);
        break;

      case "TV's":
        setIsBrand(false);
        MatchBrands(tvBrands);
        break;

      default:
        setIsBrand(true);
        break;
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
        toast.error("Invalid credentials", {
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

        <div>
          <label htmlFor="productType">SubCategory:</label>
          <select
            id="productType"
            name="ProductType"
            value={productData["SubCategory"] || ""}
            onChange={(e) => matchBrand(e)}
          >
            <option value="">None</option>
            {/* Map over productType array to generate options */}
            {PopulatedSubcategory?.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {isBrand ? (
          <Box>
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
          </Box>
        ): <div>
        <label htmlFor="Brand">Brand:</label>
        <select
          id="Brand"
          name="Brand"
          value={productData["Brand"] || ""}
          onChange={(e) => setProductData({ ...productData, Brand: e.target.value })}
        >
          <option value="">None</option>
          {/* Map over Brand array to generate options */}
          {Brand?.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>}

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
      
        <Typography variant="p" color="initial">
        Swap Allowed
        <Checkbox
          {...label}
          onChange={(e) => isSwapChecker()}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </Typography>

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

        <Typography variant="p" color="initial">
        Negotiable
        <Checkbox
          {...label}
          onChange={(e) => isNegotiableChecker()}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </Typography>


      <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddAPhotoIcon />}
                  sx={uploadButton}
                >
                  Add Image
                  <input
                    type="file"
                    // accept=".png, .jpg, .jpeg"
                    id="image"
                    name="file"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>

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
