let Post = require("../models/post.model").Post;
let uniq = require("uniqid");
let express = require("express");

// Create a new express router
let router = express.Router();

// Add a new route to get all the posts
router.get("/", async (req, resp) => {
  let posts = await Post.find();
  resp.send(posts);
});

router.get("/:id", async (req, resp) => {
  let id = req.params.id;
  let post = await Post.findOne({id: id});
  resp.send(post);
});

// Add a new route to create a new post
// Recieve the post data from the request body
// Save the post to the database
router.post("/", async (req, resp) => {
  let reqBody = req.body;
  let imgPath;
  if (req.imageURL) {
    imgPath = req.imageURL;
  } else {
    // Since localhost:3000 connects to the public folder, we need to remove the public folder from the path
    imgPath = req.file.path.substring(
      req.file.path.indexOf("/"),
      req.file.path.length
    );
  }

  let newPost = new Post({
    id: uniq(),
    title: reqBody.title,
    date: new Date(),
    description: reqBody.description,
    text: reqBody.text,
    country: reqBody.country,
    imageURL: imgPath,
  });
  await newPost.save();
  //   console.log(req.file);
  resp.send("Post created!");
});

router.delete("/:id", async (req, resp) => {
  let d_id = req.params.id;
  console.log(d_id);
  await Post.deleteOne({id: d_id});
  resp.send("Post deleted!");
});

router.put("/:id", async (req, resp) => {
  let id = req.params.id;
  await Post.updateOne({id: id}, req.body);
  resp.send("Post updated!");
});

module.exports = router;