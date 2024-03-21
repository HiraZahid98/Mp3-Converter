const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");

const corsOptions = {
  //   origin: "https://mplayer1.netlify.app",
  // origin: "https://mp4converter.netlify.app/", //your frontend url here
// origin:"https://frontend--mp4converter.netlify.app",
origin:"https://ytconvertpro.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  exposedHeaders: "**",
 // exposedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.get("/download", async (req, res, next) => {
  console.log(req.query.url);
  try {
    const videoUrl = req.query.url;
    const videoInfo = await ytdl.getInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
    console.log(audioFormats);
    audioFormats.map((item) => {
      console.log(item.url);
      res.send(item.url);
    });
    
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
