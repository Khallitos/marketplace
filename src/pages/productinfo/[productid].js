import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Badge, Box, Button, Divider, Stack, Typography } from "@mui/material";
import TrendCards from "../../components/TrendCards";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const linkStyle = {
  textDecoration: "none",
};

const DownloadBtnDesign = {
  width: "300px",
  backgroundColor: "orange",
  color: "white",
};
const pageDesign = {
  marginTop: "60px",
  padding: {
    xs: "20px",
  },
  marginX: {
    lg: 15,
    md: 10,
    xl: 25,
    sm: 2,
    xs: "auto",
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
  img: {
    xs: {
      borderRadius: "1rem",
      marginX: "auto",
      marginTop: "2%",
      width: "575px",
      height: "400px",
      objectFit: "cover",
      filter: "brightness(70%)",
    },
    lg: {
      borderRadius: "1rem",
      marginX: "auto",
      marginTop: "2%",
      width: "400px",
      height: "400px",
      objectFit: "cover",
      filter: "brightness(70%)",
    },
  },
};

const sidebar = {
  marginTop: "300px",
  backgroundColor: "#332E2E",
  padding: "10px",
  marginLeft: {
    xl: "100px",
    lg: "50px",
    md: "50px",
  },
  // display:{
  //   sm:"none",
  //   xs:"none",
  // }
  "@media (max-width: 900px)": {
    display: "none",
  },
  "@media (max-width: 1000px)": {
    display: "none",
  },
  width: "300px",
};

export default function productDetails() {
    
  const router = useRouter();
  const { productid } = router.query;
  const [product, setProduct] = useState({});

  const {
    getAllSingleProductDetails,
    downloadCounter,
    isloading, 
  } = useAppContext();

  
  const getSingleProductDetails = async (productid) => {
    const results = await getAllSingleProductDetails(productid);

    setProduct(results);
  };

  const downloadCount = (id) => {
    downloadCounter(id);
  };

  useEffect(() => {
    getSingleProductDetails(productid);
  }, [productid]);

  if (isloading)
    return (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          color: "orange",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={pageDesign}>
        <Box key={product?._id}>
          <img
            src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${product?.Key1}`}
            alt=""
          />
          <Typography
            variant="h4"
            color="initial"
            sx={{ marginTop: "5px", color: "white" }}
          >
            {product?.title}
          </Typography>

          <p sx={{ marginBottom: "10px", textAlign: "left !important" }}>
            {" "}
            {product?.description}
          </p>
          <Stack>
            <Stack direction="row" spacing={1}>
              Total Downloads
              <Chip
                label={product?.Title}
                sx={{
                  marginLeft: "10px",
                  backgroundColor: "#7e6638",
                  color: "white",
                }}
              />
            </Stack>
          </Stack>
          <p>Listen to music here</p>

          <audio controls>
            <source
              src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${product?.Key1}`}
              type="audio/mpeg"
            />
          </audio>
         

          <Link
            href={`https://kanmusic.s3.eu-west-2.amazonaws.com/${product?.Key1}` }
            download
            sx={{ fontSize: "30px" }}
          >
            download
             </Link>
            <Button
              onClick={() => getMusicLink(`https://kanmusic.s3.eu-west-2.amazonaws.com/${product?.Key1}`,product?.title)}
              variant="contained"
              sx={DownloadBtnDesign}
            > 
              Download
            </Button>
         

          {/* Random songs */}

        </Box>
      </Box>
      <Box sx={sidebar}>
        
      </Box>
    </Box>
  );
}
