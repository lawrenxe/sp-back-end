const mongoose = require("mongoose");
const { apiKeys } = require("../apiKeys");

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: String, required: true },
  lastPurchase: { type: String, required: true },
  title: { type: String, required: true },
  verifiedBy: { type: String, required: true },
  image_url: { type: String, required: true },
});

const PostModule = () => {
  mongoose;

  const Post = mongoose.model("Posts", postSchema);

  let PostModule = {};

  PostModule.submitPost = async (postData) => {
    await mongoose.connect(apiKeys.MONGO_AUTH);
    console.log("successfully connected to MongoDB.");
    // create a new post
    const newPost = new Post(postData);
    await newPost.save();
    return newPost;
  };

  return PostModule;
};

module.exports = PostModule;
