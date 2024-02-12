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
import { Alert } from "../../components";

import condition from "@/utils/condition";
import { Description } from "@mui/icons-material";
import { ProductDetailsInfoValidationSchema } from "../../components/validations/ProductDetailsInfoValidationSchema";

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

const DescriptionForm = {
  fontSize: "100px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  height: "80%",
  textColor: "white",
  backgroundColor: "white",
};

const ProductDetailsForm = () => {
  const {
    setStep,
    productData,
    setProductData,
    MatchBrands,
    PopulatedSubcategory,
    Brand,
    showAlert,
  } = useAppContext();

  const [isBrand, setIsBrand] = useState(true);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isSwap, setIsSwap] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    // Check for duplicate images
    const existingImages = selectedFilesArray.filter(file => {
      return !selectedImages.some(selectedImage => selectedImage.name === file.name && selectedImage.size === file.size);
    });
    const oversizedImages = selectedFilesArray.filter((file) => {
      return file.size > 5 * 1024 * 1024; // 5MB limit
    });

    if (existingImages.length > 0) {
      toast.error("Please upload at least three images for the product", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return; // Stop further processing
    }
    if (existingImages) {
      toast.error("Please select unique images", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return; // Stop further processing
    }

     

    if (oversizedImages.length > 0) {
      toast.error("Image size should not exceed 5mb", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; // Stop further processing
    }

    // Convert valid images to URLs and add them to selectedImages
    const imagesArray = selectedFilesArray.map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    setProductData({ ...productData, Images: imagesArray });
  };

  const isNegotiableChecker = () => {
    setIsNegotiable(!isNegotiable);
    setProductData({ ...productData, Negotiable: isNegotiable });
  };

  const isSwapChecker = () => {
    setIsSwap(!isSwap);
    setProductData({ ...productData, Swapped: isSwap });
  };

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

    

  //   if (
  //     !productData["SubCategory"] &&
  //     !productData["Brand"] &&
  //     !productData["Description"] &&
  //     !productData["Price"] &&
  //     !productData["Condition"]
  //   ) {
  //  alert("Yoooo")
  //   }

    const ProductDetailsInfo = {
      SubCategory: productData["SubCategory"],
      Brand: productData["Brand"],
      Description: productData["Description"],
      Price: productData["Price"],
      Condition: productData["Condition"],
    };

    try {
      const isValidProductDetails =
        await ProductDetailsInfoValidationSchema.isValid(ProductDetailsInfo);

      if (isValidProductDetails) {
        if (selectedImages.length < 3) {
          //  imageCountErr()

          toast.error("Please upload at least three images for the product", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      else{
        
        toast.error("Please fill in all the required fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
        ) : (
          <div>
            <label htmlFor="Brand">Brand:</label>
            <select
              id="Brand"
              name="Brand"
              value={productData["Brand"] || ""}
              onChange={(e) =>
                setProductData({ ...productData, Brand: e.target.value })
              }
            >
              <option value="">None</option>
              {/* Map over Brand array to generate options */}
              {Brand?.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
          sx={DescriptionForm}
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
            accept=".png, .jpg, .jpeg"
            id="image"
            name="file"
            multiple
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        <Box>
          {showAlert && <Alert />}

          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <Box key={image}>
                  <img src={image} height="200" />
                  <button
                    onClick={() =>
                      setSelectedImages(
                        selectedImages.filter((e) => e !== image)
                      )
                    }
                  >
                    Delete Image
                  </button>
                </Box>
              );
            })}
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
