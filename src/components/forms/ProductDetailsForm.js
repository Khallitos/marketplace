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
import { useAppContext } from "../../context/AppContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Alert } from "../../components";
import condition from "@/utils/condition";
import choice from "@/utils/choice";
import choices from "@/utils/choices";
import { Description } from "@mui/icons-material";
import { ProductDetailsInfoValidationSchema } from "../../components/validations/ProductDetailsInfoValidationSchema";
import { audioBrands, phoneBrands, homeApplianceBrands, laptopBrands, tvBrands } from "../../utils/productType"; // Adjust the path as per your project structure

const formText = {
  fontSize: "16px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  textColor: "black", // Change as per your requirement
  backgroundColor: "white",
};

const uploadButton = {
  width: "300px",
  color: "black",
  marginBottom: "5px",
  backgroundColor: "orange",
  marginTop:"10px",
  "&:hover": {
    backgroundColor: "black",
    color: "orange",
  },
};

const DescriptionForm = {
  fontSize: "16px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  height: "80%",
  textColor: "black", // Change as per your requirement
  backgroundColor: "white",
};


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ProductDetailsForm = () => {
  const {
    setStep,
    productData,
    setProductData,
    MatchBrands,
    PopulatedSubcategory,
    Brand,
    showAlert,
    uploadProduct,
    setSelectedImages,
    selectedImages,

  } = useAppContext();

  const [isBrand, setIsBrand] = useState(true);
 

  const [formData, setFormData] = useState(null);

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedFormData = new FormData();
    updatedImages.forEach((file, i) => {
      updatedFormData.append(`image-${i}`, file);
    });
    setFormData(updatedFormData);
  };
  const handleImageUpload = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const oversizedImages = selectedFilesArray.filter((file) => {
      return file.size > 5 * 1024 * 1024; // 5MB limit
    });

    if (oversizedImages.length > 0) {
      toast.error("Image size should not exceed 5mb", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; // Stop further processing
    }

    setSelectedImages((prevImages) => [...prevImages, ...selectedFilesArray]); 
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

    const ProductDetailsInfo = {
      SubCategory: productData["SubCategory"],
      Brand: productData["Brand"],
      Description: productData["Description"],
      Price: productData["Price"],
      Condition: productData["Condition"],
      Swappable: productData["Swappable"] ,
      Negotiable: productData["Negotiable"]
    };

    try {
      const isValidProductDetails =
        await ProductDetailsInfoValidationSchema.isValid(ProductDetailsInfo);

      if (!isValidProductDetails) {
        toast.error("Please fill in all the required fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      if (selectedImages.length < 3) {
        toast.error("Please upload at least three images for the product", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

 
     console.log("Selected Images:", selectedImages);

     let formData = new FormData();
     for (let i = 0; i < selectedImages.length; i++) {
      formData.append(`file${i}`, selectedImages[i]);
    }

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
     uploadProduct({formData})
  

    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    // Any side effects on component mount
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ToastContainer />

        {/* Subcategory selection */}
        <div>
          <label htmlFor="productType">SubCategory:</label>
          <select
            id="productType"
            name="ProductType"
            value={productData["SubCategory"] || ""}
            onChange={(e) => matchBrand(e)}
          >
            <option value="">None</option>
            {PopulatedSubcategory?.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Brand selection */}
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
              {Brand?.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Description */}
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

        {/* Price */}
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

       

        {/* Condition */}
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
          </Select>
        </FormControl>

        {/* Negotiable */}
           
           <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-helper-label"></InputLabel>
          <Typography variant="p">
            Negotiable
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <Select
            value={productData["Negotiable"] || ""}
            displayEmpty
            name="Negotiable"
            label="Negotiable"
            onChange={(e) =>
              setProductData({ ...productData, Negotiable: e.target.value })
            }
          >
            {choice.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          {/* Swapped allowed */}
           
          <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-helper-label"></InputLabel>
          <Typography variant="p">
           Swap Allowed
            <Typography component="span" sx={{ color: "red" }}>
              *
            </Typography>
          </Typography>
          <Select
            value={productData["Swappable"] || ""}
            displayEmpty
            name="Swappable"
            label="Swappable"
            onChange={(e) =>
              setProductData({ ...productData, Swappable: e.target.value })
            }
          >
            {choices.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Add Image */}
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

        {/* Display selected images */}
        <Box>
          {showAlert && <Alert />}

          {selectedImages &&
            selectedImages.map((image, index) => (
              <Box key={index}>
                <img src={URL.createObjectURL(image)} height="200" />
                <button
                onClick={() => handleImageDelete(index)}
                >
                  Delete Image
                </button>
              </Box>
            ))}
        </Box>

        {/* Form navigation buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setStep(1)}>Back</Button>
          <Button onClick={(e) =>ProductFormValidation(e)}>Completed</Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailsForm;
