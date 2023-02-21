import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Cards from "../components/Cards";
import PageBtn from "../components/PageBtn";
import Box from "@mui/material/Box";
import { margin } from "@mui/system";
import Typography from "@mui/material/Typography";
import TrendCards from "../components/TrendCards";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link"

const linkStyle = {
  textDecoration: "none",
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
  width: "300px"
};
const pageDesign = {
  marginTop: "20px",
  marginX: {
    lg: 15,
    md: 10,
    xl: 25,
    sm: 2,
  },
  width: "600px",
};
const Dsgsearch = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 400,
  marginBottom: "20px",
  marginX: {
    lg: "40%",
    sm: "",
    xl: "45%",
    md: "30%",
  },
};

const DsgsearchText = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 400,
  marginRight: {
    lg: "40%",
    sm: "",
    xl: "45%",
    md: "30%",
  },
};

export default function home() {
  const {
    getAllSongs,
    AllSongs,
    page,
    searchSong,
    isloading,
    TrendingSongs,
    getAllTrendingSongs,
    getAllRandomSongs,
    RandomSongs,
    totalSongs,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [isSuggestions, setIsSuggestions] = useState(false);
  const Search = (e) => {
    searchSong(search);
    setIsSuggestions(true);
  };

  const getSongs = () => {
    getAllSongs();
  };

  const getRandomSongs = () => {
    getAllRandomSongs();
  };
  const getTrendingSongs = () => {
    getAllTrendingSongs();
  };

  useEffect(() => {
    getSongs();
  }, [page]);

  useEffect(() => {
    getTrendingSongs();
    getRandomSongs();
  }, []);

  useEffect(() => {
    if (search.length < 1) {
      getSongs();
    }
  }, [search.length]);

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
    <Box sx={{ display: "flex" }}>
      <Box sx={pageDesign}>
        <Typography variant="h6" color="initial" sx={DsgsearchText}>
          {" "}
          Find a song..
        </Typography>

        <Paper component="form" sx={Dsgsearch}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search......"
            inputProps={{ "aria-label": "Search for a song" }}
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={Search}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>

        <div>
          {!totalSongs && (
            <Typography
              variant="h5"
              color="initial"
              sx={{ marginBottom: "20px" }}
            >
              No results found
            </Typography>
          )}

          {AllSongs.map((song) => (
            <Link href={"/download/" + song._id} style={linkStyle}>
             
                <Cards
                  key={song._id}
                  title={song.title}
                  artist={song.artist}
                  Genre={song.Genre}
                  description={song.description}
                  ImageKey={song.Key}
                />
             
            </Link>
          ))}
        </div>

        <PageBtn />

        {/* Random songs */}
        {isSuggestions && (
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
        )}
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
};


