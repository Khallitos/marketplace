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

const sidebar = {
  marginTop: "300px",
  backgroundColor: "#fff",
  padding: "10px",
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
};
const dsgSingleSong = {
  marginTop: "30%",
  display: "flex",
  flexDirection: "column",
  marginBottom: "20%",
  marginX: {
    lg: 30,
    md: 20,
    xl: 35,
    sm: 2,
  },
  img: {
    borderRadius: "1rem",
    marginTop: "2%",
    left: "0",
    width: "250px",
    height: "250px",
    objectFit: "cover",
    filter: "brightness(70%)",
  },
  p: {
    marginTop: "%5",
    fontSize: "20px",
  },
  a: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },

  button: {
    width: "400px",
    height: "70px",
    color: "#fff",
  },
  width: "800px",
};

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
    console.log(songid)
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
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  
  return (
    <Box sx={{ marginTop: "100px", display: "flex" }}>
      <Box key={song?._id} sx={dsgSingleSong}>
        <img
          src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key}`}
          alt=""
        />
        <Typography variant="h5" color="initial" sx={{ marginTop: "10px" }}>
          {song?.title}
        </Typography>

        <p sx={{ marginBottom: "10px" }}> {song?.description}</p>
        <Stack>
          <Stack direction="row" spacing={1}>
            Total Downloads
            <Chip
              label={song?.downloadCount}
              color="success"
              sx={{ marginLeft: "10px" }}
            />
          </Stack>
        </Stack>
        <p>
          Listen to music here <HeadphonesIcon></HeadphonesIcon>
        </p>

        <audio controls>
          <source
            src={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key1}`}
            type="audio/mpeg"
          />
        </audio>
        <Button onClick={() => downloadCount(song?._id)} variant="contained">
          <a href={`https://kanmusic.s3.eu-west-2.amazonaws.com/${song?.Key1}`}>
            Download Song
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
