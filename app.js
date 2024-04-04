// Purpose: This file is the entry point of the application. It is responsible for creating the express application and starting the server.
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let multer = require("multer");
let postRoute = require("./routes/posts.route");
let callbackRequestRoute = require("./routes/callback-requests.route");

mongoose.connect("mongodb://localhost/travels");

app.use(express.json());

// Create a new multer storage object
// Set the destination to the public/images folder
// Set the filename to the original name of the file
let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

app.use(multer({ storage: imageStorage }).single("imageFile"));

app.use(express.static("public"));
app.use("/posts", postRoute);
app.use("/callback-requests", callbackRequestRoute);

app.listen(3000, () => console.log("Server is running on port 3000..."));
