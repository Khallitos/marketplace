import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material/";
import { PersonIcon, LockIcon } from "@mui/icons-material/";
import { AccountCircleIcon } from "@mui/icons-material/AccountCircle";
import { useAppContext } from "../context/AppContext";
import { Alert, DashboardNavs, FormRowSelect, MobileNav, Subfooter } from "../components";

const pageDesign = {
  marginTop: "60px",
  marginX: {
    lg: 10,
    md: 10,
    xl: 10,
    sm: 2,
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
  display:"flex",
  flexDirection: {
    xs:"column",
    lg:"row",
    md:"row",
    xl:"row",
    sm:"row"
  }
};

const formDesign = {
  borderRadius: "10px solid #1976d2 !important",
  borderTop: "3px solid orange",
  margin: "auto",
  padding: "20px",
  color: "white",
  backgroundColor: "#666",
};
const DefaultGenre = "Afrobeats";
const initialState = {
  title: "",
  Genre: "",
  description: "",
  artist: "",
  song: "",
};
const formText = {
  fontSize: "100px",
  width: "300px",
  textColor: "white",

  backgroundColor: "white",
};
const RegisterBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: {
    lg: "center",
    xs: "",
  },
  justifyContent: "center",
  paddingX: "30px",
  marginX: {
    lg: "25%",
    md: "25%",
    xl: "25%",
    sm: "20",
    xs: "auto",
  },
  marginTop: {
    lg: "10px",
    md: "10px",
    xl: "10px",
    sm: "10px",
    xs: "20px",
  },
  width: {
    sm: "400px",
    lg: "600px",
    xl: "800px",
  },
};

const UploadSong = () => {
  const [values, setValues] = useState(initialState);
  const [image, setImage] = useState({
    file: "",
    userImage: "",
    message: "",
    success: false,
  });
  const [music, setMusic] = useState({
    songfile: "",
    songpath: "",
    message: "",
    success: false,
  });
  const {
    displayEmptyErr,
    displayPasswordMismatchErr,
    showAlert,
    setupUser,
    Genre,
    DefaultGenre,
    uploadMusic,
    uploadErrorHandler,
    email
  } = useAppContext();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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


  ;

    reader.readAsDataURL(file);
    // const newImagefile = e.target.files[0];
    // // const base64data = await getBase64.fromFile(newImagefile);
    // setImage(newImagefile);
  };

  const handleSongUpload = async (e) => {
    let reader = new FileReader();
    let songfile = e.target.files[0];
    reader.onloadend = () => {
      setMusic({
        ...music,
        songfile: songfile,
        songpath: reader.result,
        message: "",
      });
    };

    reader.readAsDataURL(songfile);
    // const newImagefile = e.target.files[0];
    // // const base64data = await getBase64.fromFile(newImagefile);
    // setImage(newImagefile);
  };

  const Uploadmusic = (e) => {

    e.preventDefault();

    if(!values.title || !values.Genre || !values.artist || !values.description || !music.songfile || !image.file){
      uploadErrorHandler()
      return
    }


      let formData = new FormData();
      formData.append('file',image.file)
      formData.append('file1',music.songfile)
      formData.append("title",values.title)
      formData.append("Genre",values.Genre)
      formData.append("artist",values.artist)
      formData.append("description",values.description)
      formData.append("email",email)
        console.log(formData)
      uploadMusic({
        formData,
        alertText: "Song successfully upload and awaiting approval",
      });

      setImage({...image,file: ""})
      setMusic({...music, songfile:""})
      setValues({...values, title:""})




    // const { title, description, Genre } = values;

    // if (!title || !description || !Genre) {
    //   displayEmptyErr();
    //   return;
    // }
    // const songDetails = { title, description, Genre, image };

  };

  return (
    <><Box sx={{ display: "flex" }}>
    <Box sx={pageDesign}>
    <MobileNav/>

      <DashboardNavs/>
    <Box sx={RegisterBox}>
       <Box sx={formDesign}>
      {showAlert && <Alert />}
      {image.message && <h3>{image.message}</h3> }
      <form>
        <Typography variant="h6">Upload Song</Typography>

        {/* Title*/}
       {image.userImage && <img
          src={image.userImage}
          sx={{ width: "10px", height: "10px" }}
          alt=""
        />}
        <TextField
        sx= {formText}
          margin="normal"
          required
          fullWidth
          id="title"
          variant="standard"
          label="title"
          name="title"
          value={values.title}
          autoComplete="title"
          autoFocus
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "black" },
          }}
          InputProps={{
            style: {
              color: "black",
            },
          }}
        />

        {/* Genre */}
        <FormRowSelect
          labelText="Genre"
          sx= {formText}
          variant="standard"
          name="Genre"
          value={values.Genre}
          handleChange={handleChange}
          list={Genre}
          defaultValue={"Afrobeats"}
          InputLabelProps={{
            style: { color: "black" },
          }}
          InputProps={{
            style: {
              color: "black",
            },
          }}
        />

        {/*Artiste*/}

        <TextField
          margin="normal"
          sx= {formText}
          required
          variant="standard"
          fullWidth
          id="artist"
          label="artist"
          name="artist"
          value={values.artist}
          autoComplete="artist"
          autoFocus
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "black" },
          }}
          InputProps={{
            style: {
              color: "black",
            },
          }}
        />

        <TextField
          margin="normal"
          sx= {formText}
          required
          fullWidth
          variant="standard"
          id="description"
          label="Description of song "
          name="description"
          value={values.description}
          autoComplete="description"
          autoFocus
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "black" },
          }}
          InputProps={{
            style: {
              color: "black",
            },
          }}
        />
        <Box sx={{display:"flex" }}>
        <Button variant="contained" component="label" sx={{marginRight:"10px"}}>
          Upload image
          <input
            type="file"
            // accept=".png, .jpg, .jpeg"
            id="image"
            name="file"
            hidden
            onChange={handleImageUpload}
          />

        </Button>
        <Button variant="contained"  component="label"  sx={{marginRight:"10px"}}>
          Upload song
          <input type="file" hidden id="song" multiple name="file1" onChange={handleSongUpload} />
        </Button>

        <Button variant="contained" onClick={Uploadmusic}  sx={{marginRight:"10px"}}>
          submit song
        </Button>
        </Box>
      </form>
      </Box>
    </Box>
    </Box>
    </Box>
    <Subfooter/>
    </>
  );
};

export default UploadSong;
