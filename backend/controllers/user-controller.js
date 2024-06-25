import mongoose from 'mongoose';
// get user model registered in Mongoose
const User = mongoose.model("User");

const userFindbyPost = (req, res, next) => {
  if (!req.body.id) { return res.send('No id provided') }

  User.findOne({ _id: req.body.id}, (err, user) => {
    if (!err) { res.send(user) }
  })
}

const userFindAll = (req, res, next) => {
  const q = req.query.q;
  User.find({ $or: [ {firstname: new RegExp(q, 'i')}, {lastname: new RegExp(q, 'i')} ] },(err, users) => {
    if (!err) { 
      res.send(users);
    }
  })
}

const acceptRequest = (req, res, next) => {
  const userid = req.body.userid;
  const reqid = req.body.reqid;

  User.updateOne({_id: userid},{$pull: {friendrequests: reqid}}, (err) => {
    if(!err){
      
    }
  });
  User.updateOne({_id: userid},{$push: {friendslist: reqid}}, (err) => {
    if(!err){
      
    }
  });
  User.updateOne({_id: reqid},{$push: {friendslist: userid}}, (err) => {
    if(!err){
      
    }
  });

  User.updateOne({_id: reqid},{$pull: {sent_friendrequests: userid}}, (err) => {
    if(!err){
      
    }
  });
  res.send({success: true})
}

const rejectRequest = (req, res, next) => {
  const userid = req.body.userid;
  const reqid = req.body.reqid;

  User.updateOne({_id: userid},{$pull: {friendrequests: reqid}}, (err) => {
    if(!err){
      
    }
  });

  User.updateOne({_id: reqid},{$pull: {sent_friendrequests: userid}}, (err) => {
    if(!err){
      
    }
  });
  res.send({success: true})
}

const addFriend = (req, res, next) => {
  const profileid = req.body.profileid;
  const userid = req.body.userid;
  User.findById({_id : userid}, (err, user) => {
    if (!err) { 
      if(profileid == userid || user.friendslist.includes(profileid) || user.friendrequests.includes(profileid) || user.sent_friendrequests.includes(profileid)){
        res.send({ success: false })
      }
    }
  });
  User.updateOne({_id: req.body.userid},{$push: {sent_friendrequests: req.body.profileid}}, (err, user) => {
    if(!err){
    }
  });
  User.updateOne({_id: req.body.profileid},{$push: {friendrequests: req.body.userid}}, (err, user) => {
    if(!err){
    }
  });
  res.send({success: true})
}


const findFriends = (req, res, next) => {
  const friendslist = req.body.friendslist; 
  User.find({_id : { $in: friendslist }}, (err, friend) => {
    if (!err) {
      res.send(friend);
    }
  });
}

const findFriendrequest = (req, res, next) => {
  const friendrequests = req.body.friendrequests; 
  User.find({_id : { $in: friendrequests }}, (err, friendreq) => {
    if (!err) {
      res.send(friendreq);
    }
  });
}
    

const checkAddStatus = (req, res, next ) => {
   const profileid = req.body.profileid;
   const userid = req.body.userid;
   User.findById({_id : userid}, (err, user) => {
    if (!err) { 
      if(profileid == userid || user.friendslist.includes(profileid) || user.friendrequests.includes(profileid) || user.sent_friendrequests.includes(profileid)){
        res.send({ addStatus: false })
      }else 
        res.send({ addStatus: true })
    }
  })
}


export { userFindbyPost, userFindAll, checkAddStatus, addFriend, findFriends, findFriendrequest, acceptRequest, rejectRequest}