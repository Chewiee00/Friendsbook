import mongoose from 'mongoose';

// get post model registered in Mongoose
const Post = mongoose.model("Post");

//add post
const addPost = (req, res) => {
  const newpost = new Post({
    userid: req.body.userid,
    author: req.body.author,
    content: req.body.content
  });
  newpost.save((err) => {
    if (err) { console.log(err); return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });
}
//findallposts
const postFindAll = (req, res, next) => {
  const userid = req.body.userid;

  Post.find({  },(err, posts) => {
    if (!err) { 
      res.send(posts);
    }
  })
}

//delete post
const deletePost  = (req, res) => {
  Post.deleteOne({id: req.query.id}, (err, post)  => {
    if (!err) {
      res.send({success: true});
    }
  });
}

export { addPost, deletePost,postFindAll }
