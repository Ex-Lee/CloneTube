// export const videos = [
//   {
//     id: 324393,
//     title: "Video awesome",
//     description: "This is something I love",
//     views: 24,
//     videoFile: "https://archive.org/details/BigBuckBunny_124",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 1212121,
//     title: "Video super",
//     description: "This is something I love",
//     views: 24,
//     videoFile: "https://archive.org/details/BigBuckBunny_124",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 55555,
//     title: "Video nice",
//     description: "This is something I love",
//     views: 24,
//     videoFile: "https://archive.org/details/BigBuckBunny_124",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
//   {
//     id: 11111,
//     title: "Video perfect",
//     description: "This is something I love",
//     views: 24,
//     videoFile: "https://archive.org/details/BigBuckBunny_124",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com",
//     },
//   },
// ];
//mongodb://localhost:27017/clonetube
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(
  process.env.PRODUCTION === "true"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL
);
mongoose.connect(
  process.env.PRODUCTION === "true"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFIndAndModify: false,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log(`✅ Connected to DB`);

const handleError = (err) => console.log(`❌ Error on DB Connection:${err}`);

db.once("open", handleOpen);
db.on("error", handleError);
