import Upload from "../models/Upload.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import BadRequestError from "../errors/bad-request.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import uploadFile from "../utils/s3.js";
import musicFile from "../utils/musicFile.js";
import { request } from "express";
import { formvalidationSchema } from "../validations/formvalidationSchema.js";

const uploadproduct = async (req, res) => {
  try {
    const imagesData = req.files;
    const bodydata = req.body;
    const {
      Region,
      RegionSurberb,
      Title,
      ProductType,
      SubCategory,
      Brand,
      Description,
      Price,
      Condition,
      Swappable,
      Negotiable,
    } = bodydata;

    const isFormDataValid = await formvalidationSchema.validate(bodydata);

    if (isFormDataValid) {
      if (imagesData.length < 3) {
        throw new BadRequestError("Please upload at least three images");
      } else {
        const sizeOfFile1 = imagesData.file0[0].size;
        const sizeOfFile2 = imagesData.file1[0].size;
        const sizeOfFile3 = imagesData.file2[0].size;

        const mimetype1 = imagesData.file0[0].mimetype;
        const mimevalue1 = mimetype1.split("/")[0];

        const mimetype2 = imagesData.file1[0].mimetype;
        const mimevalue2 = mimetype2.split("/")[0];

        const mimetype3 = imagesData.file2[0].mimetype;
        const mimevalue3 = mimetype3.split("/")[0];

        if (
          sizeOfFile1 > 5000000 ||
          sizeOfFile2 > 5000000 ||
          sizeOfFile2 > 5000000
        ) {
          throw new BadRequestError("Image file should be less than 5mb");
        }
        if (
          mimevalue1 !== "image" ||
          mimevalue2 !== "image" ||
          mimevalue3 !== "image"
        ) {
          throw new BadRequestError("Image should be in jpg/png/jpeg format");
        }
        const filename1 = mimetype1.replace("audio/", "");
        const filename2 = mimetype2.replace("audio/", "");
        const filename3 = mimetype3.replace("audio/", "");

        const buffer1 = imagesData.file1[0].buffer;
        const buffer2 = imagesData.file1[0].buffer;
        const buffer3 = imagesData.file2[0].buffer;

        const Key1 = nanoid() + "." + filename1;
        const Key2 = nanoid() + "." + filename2;
        const Key3 = nanoid() + "." + filename3;

        const upload1 = uploadFile(buffer1, Key1);
        const upload2 = uploadFile(buffer2, Key2);
        const upload3 = uploadFile(buffer3, Key3);

        const uploadData = await Upload.create({
          Region,
          RegionSurberb,
          Title,
          ProductType,
          SubCategory,
          Brand,
          Description,
          Price,
          Condition,
          Swappable,
          Negotiable,
          Key1,
          Key2,
          Key3
        });

        if(uploadData){
          console.log("successful")

          if(upload1 && upload2 && upload3){
              console.log("i go")
          }
        }
      }
    } else {
    }
  } catch (e) {
    console.log(e.message);
  }

};

const songInfo = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 2;
  const skip = (page - 1) * limit;

  const { email } = req.body;
  const mySongs = await Upload.find({ email: email }).skip(skip).limit(limit);
  const totalData = await Upload.find({ email: email });
  const numOfPages = Math.ceil(totalData.length / limit);

  res.status(200).json({ mySongs, totalSongs: totalData.length, numOfPages });
};

const SingleSongInfo = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const data = await Upload.findOne({ _id: id });
  res.status(200).json({ data });
};

// get all songs

const getAllSongs = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const allSongs = await Upload.find({ verified: true })
    .skip(skip)
    .limit(limit);
  const totalData = await Upload.find();
  const numOfPages = Math.ceil(totalData.length / limit);

  res.status(200).json({ allSongs, numOfPages, totalSongs: allSongs.length });
};

//Get all unverified songs

const getAllUnverifiedSongs = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const allSongs = await Upload.find({ verified: false })
    .skip(skip)
    .limit(limit);
  const PendingSongs = await Upload.find({ verified: false });
  const CountofPendingSongs = PendingSongs.length;
  const ApprovedSongs = await Upload.find({ verified: true });
  const CountofApprovedSongs = ApprovedSongs.length;
  const totalData = await Upload.find();
  const numOfPages = Math.ceil(totalData.length / limit);

  res.status(200).json({
    allSongs,
    numOfPages,
    totalSongs: allSongs.length,
    CountofApprovedSongs,
    CountofPendingSongs,
  });
};

//Will check later
const getSongsForAdmin = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const allSongs = await Upload.find({ verified: false })
    .skip(skip)
    .limit(limit);
  const totalData = await Upload.find();
  const numOfPages = Math.ceil(totalData.length / limit);

  res.status(200).json({ allSongs, numOfPages, totalSongs: allSongs.length });
};

//Search for a song

const searchSong = async (req, res) => {
  const song = req.query.song;
  const limit = 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const SongTitle = new RegExp(song, "i");
  const SearchedSong = await Upload.find({
    $or: [{ artist: SongTitle }, { title: SongTitle }],
    verified: true,
  })
    .skip(skip)
    .limit(limit);

  const SearchedSongCount = await Upload.find({
    $or: [{ artist: SongTitle }, { title: SongTitle }],
  });
  console.log("this is ", SearchedSong);
  const numOfPages = Math.ceil(SearchedSongCount.length / limit);
  res
    .status(200)
    .json({ SearchedSong, numOfPages, totalSongs: SearchedSongCount.length });
};

//Search for a admin song

const searchSongForAdmin = async (req, res) => {
  const song = req.query.song;
  const limit = 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const SongTitle = new RegExp(song, "i");
  const SearchedSong = await Upload.find({
    $or: [{ artist: SongTitle }, { title: SongTitle }],
    verified: false,
  })
    .skip(skip)
    .limit(limit);

  const SearchedSongCount = await Upload.find({
    $or: [{ artist: SongTitle }, { title: SongTitle }],
  });
  console.log("this is ", SearchedSong);
  const numOfPages = Math.ceil(SearchedSongCount.length / limit);
  res
    .status(200)
    .json({ SearchedSong, numOfPages, totalSongs: SearchedSongCount.length });
};
// delete a song

const deleteSong = async (req, res) => {
  const songid = req.query.songid;
  const data = await Upload.deleteOne({ _id: songid });

  res.status(200).json({});
};

//edit a song

const editSong = async (req, res) => {
  const { title, Genre, description, artist, id } = req.body.details;

  if (!title || !Genre || !artist || !description) {
    throw new BadRequestError("Please provide all values");
  }
  const filter = { _id: id };
  const update = {
    title: title,
    Genre: Genre,
    artist: artist,
    description: description,
  };
  const data = await Upload.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });

  res.status(200).json({ data: data });
};

// get user details
const userInfo = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;

  const data = await User.findOne({ email: email });
  console.log(data);
  res.status(200).json({ data });
};

//Approve a song

const approveSong = async (req, res) => {
  const songId = req.query.songid;
  const filter = { _id: songId };
  const update = {
    verified: true,
  };

  const data = await Upload.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });

  res.status(200).json({ data: data });
};

//download counter

const downloadCounter = async (req, res) => {
  const songId = req.query.id;
  const filter = { _id: songId };
  const counterAdded = Upload.findOneAndUpdate(filter, {
    $inc: { downloadCount: 1 },
  }).exec();

  const admincounterAdded = Upload.findOneAndUpdate(null, {
    $inc: { totalDownloads: 1 },
  }).exec();

  if (!counterAdded && admincounterAdded) {
    throw new BadRequestError(
      "Bad request please contact your system administrator"
    );
  }
  res.status(200).json({ success: "success" });
};

//admin dashboard

const getAdminDashboard = async (req, res) => {
  const PendingSongs = await Upload.find({ verified: false });
  const CountofPendingSongs = PendingSongs.length;
  const ApprovedSongs = await Upload.find({ verified: true });
  const CountofApprovedSongs = ApprovedSongs.length;

  const totalDownloads = await Upload.aggregate([
    {
      $group: {
        _id: null,
        sum: { $sum: "$downloadCount" },
      },
    },
  ]);

  console.log(JSON.stringify(totalDownloads, null, 4));

  res.status(200).json({
    CountofApprovedSongs,
    CountofPendingSongs,
    totalDownloads,
  });
};

//get trending songs
// {downloadCount:{$gt: 2}}
const getTrendingSongs = async (req, res) => {
  const TrendingSongs = await Upload.find().sort({ _id: -1 }).limit(8);
  res.status(200).json({
    TrendingSongs,
  });
};

// get random songs
const getRandomSongs = async (req, res) => {
  const update = {
    verified: true,
  };
  const rand = Math.floor(Math.random() * 2) + 1;
  console.log("this is the", rand);
  const RandomSongs = await Upload.find(update).skip(rand).limit(5);

  res.status(200).json({
    RandomSongs,
  });
};

const getSignUrl = async (req, res) => {
  const { filename, songid } = req.body;

  const url = musicFile(filename, songid);
};

export {
  uploadproduct

};
