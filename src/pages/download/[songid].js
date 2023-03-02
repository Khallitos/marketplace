import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Badge, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { height } from "@mui/system";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TrendCards from "../../components/TrendCards";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import Link from "next/link";

const linkStyle = {
  textDecoration: "none",
};
const pageDesign = {
  marginTop: "60px",
  padding: {
    xs:"20px"
  },
  marginX: {
    lg: 15,
    md: 10,
    xl: 25,
    sm: 2,
    xs:"auto"
  },
  width: {
    xl: "600px",
    xs: "640px",
  },
  bottom: "0",
  img: {
        xs:{
          borderRadius: "1rem",
          marginX:"auto",
          marginTop: "2%",
          width: "575px",
          height: "400px",
          objectFit: "cover",
          filter: "brightness(70%)"
        },
      lg:{

        borderRadius: "1rem",
          marginX:"auto",
          marginTop: "2%",
          width: "400px",
          height: "400px",
          objectFit: "cover",
          filter: "brightness(70%)"
      }
       
      },
};


const sidebar = {
  marginTop: "300px",
  backgroundColor: "#fff",
  padding: "10px",
  marginLeft: "100px",
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
// const dsgSingleSong = {
//   marginTop: {
//     xs:"10px"
//   },
//   display: "flex",
//   flexDirection: "column",
//   marginBottom: "20%",
//   marginX: {
//     xs: "auto",
//   },
//   img: {
//     xs:{
//       borderRadius: "1rem",
//       marginX:"auto",
//       marginTop: "2%",
//       width: "575px",
//       height: "400px",
//       objectFit: "cover",
//       filter: "brightness(70%)"
//     }
   
//   },
//   p: {
//     marginTop: "",
//     fontSize: "20px",
//   },
//   a: {
//     textDecoration: "none",
//     color: "white",
//     fontWeight: "bold",
//   },

//   button: {
//     width: "400px",
//     height: "70px",
//     color: "#fff",
//   },
//   width:
//   {
    

//   } ,
//   padding:"30px"
// };

export default function singleSong() {
  const router = useRouter();
  const {songid } = router.query;
  const [song,setSong] = useState({})

  const {
    getAllSingleSong,
    downloadCounter,
    getAllSongs,
    AllSongs,
    page,
    searchSong,
    isloading,
    TrendingSongs,
    getAllTrendingSongs,
    getAllRandomSongs,
    RandomSongs,
  } = useAppContext();

  const getTrendingSongs = () => {
    getAllTrendingSongs();
  };
  const getRandomSongs = () => {
    getAllRandomSongs();
  };
  const getSingleSongDetails = async (songid) => {
    const songRes = await getAllSingleSong(songid);
    
   setSong(songRes);
  };

  const downloadCount = (id) => {
    downloadCounter(id);
  };

  useEffect(() => {
    getSingleSongDetails(songid);
    getAllTrendingSongs();
    getAllRandomSongs();
  }, [songid]);
  

  if (isloading)
    return (
      <CircularProgress
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          color:"orange",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  
  return (
    
    <Box sx={{ display: "flex" }}>
    <Box sx={pageDesign}>
      <Box key={song?._id}>
        <img
          src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key}`}
          alt=""
        />
        <Typography variant="h4" color="initial" sx={{ marginTop: "5px" ,color:"white"}}>
          {song?.title}
        </Typography>

        <p sx={{ marginBottom: "10px", textAlign:"left !important" }}> {song?.description}</p>
        <Stack>
          <Stack direction="row" spacing={1}>
            Total Downloads
            <Chip
              label={song?.downloadCount}
              
              sx={{ marginLeft: "10px",backgroundColor:"#7e6638",color:"white"}}
            />
          </Stack>
        </Stack>
        <p>
          Listen to music here 
        </p>

        <audio controls>
          <source
            src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key1}`}
            type="audio/mpeg"
          />
        </audio>
        <Button onClick={() => downloadCount(song?._id)} variant="outlined" sx={{width:"100px",marginTop:"20px", backgroundColor:"#7e6638" }} >
          <a href={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key1}`} download={song?.title} sx={{fontSize:"30px"}}>
            Download 
          </a>
        </Button>

        {/* Random songs */}

        <Box sx={{ marginTop: "100px" }}>
          <Typography
            variant="h5"
            color="initial"
            sx={{ marginBottom: "10px" }}
          >
            YOU MAY ALSO LIKE <Divider light />
          </Typography>

          <Box sx={{ marginBottom: "10px" }}>
            {RandomSongs.map((song) => (
              <Link href={"/download/" + song._id} style={linkStyle}>
                <div>
                  <TrendCards
                    key={song._id}
                    title={song.title}
                    artist={song.artist}
                    Genre={song.Genre}
                    description={song.description}
                    ImageKey={song.Key}
                  />
                </div>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      </Box>
      <Box sx={sidebar}>
        <Typography
          variant="h5"
          color="initial"
          sx={{ marginBottom: "20px", marginTop: "20px", fontWeight: "bold" }}
        >
          TRENDING SONGS
        </Typography>
        <div>
          {TrendingSongs.map((song) => (
            <Link href={"/download/" + song._id} style={linkStyle}>
              <div>
                <TrendCards
                  key={song._id}
                  title={song.title}
                  artist={song.artist}
                  Genre={song.Genre}
                  description={song.description}
                  ImageKey={song.Key}
                />
              </div>
            </Link>
          ))}
        </div>
      </Box>
    </Box>
    
    
  );
}
