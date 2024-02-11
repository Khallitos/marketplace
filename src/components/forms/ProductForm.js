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
  TextField,
  Typography,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import {
  productType,
  Babycategory,
  ClothingCategory,
  EducationCategory,
  ElectronicsCategory,
  FoodCategory,
  FurnitureCategory,
  HobbiesCategory,
  ServicesCategory,
  VehiclesCategory,
} from "@/utils/productType";
import {
  GreaterAccraSuburbs,
  AshantiSuburbs,
  CentralSuburbs,
  EasternSuburbs,
} from "@/utils/location";

import { allRegions } from "@/utils/location";
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
    MatchProduct,
    Surberb,
    MatchSuberb,
  } = useAppContext();

  const [isNegotiable, setIsNegotiable] = useState("");
  const [isProductCategoryState, setProductCategoryState] = useState(false);

  const NegotiableCheckBox = () => {
    setProductData({ ...productData, Negotiable: "Yes" });
  };

  const ProductValidation = async (e) => {
    const ProductFormData = {
      Region: productData["Region"],
      RegionSurberb: productData["RegionSurberb"],
      Title: productData["Title"],
      ProductType: productData["ProductType"],
    };

    setProductCategoryState(true);
    const isValid = await ProductValidationSchema.isValid(ProductFormData);

    if (isValid) {
      setStep(2);
    } else {
      toast.error("Invalid credentials", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const matchRegion = (e) => {

    const Region = e.target.value;
    setProductData({ ...productData, Region: e.target.value });

    switch (Region) {
      case "Greater Accra":
        MatchSuberb(GreaterAccraSuburbs);
        break;

      case "Ashanti":
          MatchSuberb(AshantiSuburbs);
          break;
        
       case "Central":
            MatchSuberb(CentralSuburbs);
            break;

      case "Eastern":
              MatchSuberb(EasternSuburbs);
              break;

              default:
                // Default case
                break;
    }
  };

  const matchSubcategories = (e) => {
    const setProductTypeInfo = e.target.value;

    setProductData({ ...productData, ProductType: e.target.value });
    ProductMatching(setProductTypeInfo);

    switch (setProductTypeInfo) {
      case "Electronics & Electrical Appliances":
        MatchProduct(ElectronicsCategory);
        break;

      case "Furniture & Kitchen Appliances":
        MatchProduct(FurnitureCategory);
        break;

      case "Babies & Kids":
        MatchProduct(Babycategory);
        break;
      case "Clothing Health & Beauty":
        MatchProduct(ClothingCategory);
        break;
      case "Education":
        MatchProduct(EducationCategory);
        break;
      case "Food & Agric":
        MatchProduct(FoodCategory);
        break;
      case "Hobbies & Sport":
        MatchProduct(HobbiesCategory);
        break;
      case "Services":
        MatchProduct(ServicesCategory);
        break;
      case "Vehicles":
        MatchProduct(VehiclesCategory);
        break;
      default:
        // Default case
        break;
    }
  };

  useEffect(() => {}, []);

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

      <Typography variant="p" sx={{ marginTop: "10px" }}>
        Location
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>

      <div>
        <select
          id="Region"
          name="Region"
          value={productData["Region"]}
          onChange={(e) => matchRegion(e)}
        >
          <option value="">None</option>
          {allRegions.map((region) => (
            <option key={region.id} value={region.name}>
              {region.name} {/* Display the region name as text content */}
            </option>
          ))}
        </select>
      </div>

      <Typography variant="p" sx={{ marginTop: "10px" }}>
        Suberb
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>

      <div>
        <select
          id="RegionSurberb"
          name="RegionSurberb"
          value={productData["RegionSurberb"]}
          onChange={(e) =>  setProductData({...productData,RegionSurberb : e.target.value})}
        >
          <option value="">None</option>
          {Surberb?.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name} {/* Display the region name as text content */}
            </option>
          ))}
        </select>
      </div>

      <Typography variant="p">
        Title
        <Typography component="span" sx={{ color: "red" }}>
          *
        </Typography>
      </Typography>
      <TextField
        sx={formText}
        margin="normal"
        required
        fullWidth
        name="Title"
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={productData["Title"]}
        onChange={(e) =>
          setProductData({ ...productData, Title: e.target.value })
        }
      />

      <Typography variant="p" sx={{ marginTop: "10px" }}>
        Type of Product
        <Typography component="span" sx={{ color: "red", marginBottom: "0px" }}>
          *
        </Typography>
      </Typography>
      <div>
        <select
          id="productType"
          name="ProductType"
          value={productData["ProductType"]}
          onChange={(e) => matchSubcategories(e)}
        >
          <option value="">None</option>
          {/* Map over productType array to generate options */}
          {productType.map((product) => (
            <option key={product.id} value={product.title}>
              {product.title}
            </option>
          ))}
        </select>
      </div>

      <Divider variant="horizontal" sx={{ borderBottomWidth: "20px" }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={ProductValidation}>Next</Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
