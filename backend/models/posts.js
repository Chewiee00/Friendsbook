import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema(
  {
  userid: {type: String, required: true},
  author: { type: String, required: true },
  content: { type: String, required: true },
  },
  {timestamps : true}
);

mongoose.model("Post", PostSchema);
