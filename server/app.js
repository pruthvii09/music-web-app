const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hiii");
});

//  user authentication

const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// ! Artist

const artistRoutes = require("./routes/artist");
app.use("/api/artist/", artistRoutes);

// ! Album

const albumRoutes = require("./routes/album");
app.use("/api/albums/", albumRoutes);

// ! Songs

const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`ERROR : ${error}`);
  });

app.listen(4000, () => {
  console.log("Listening to port 4000.........");
});
