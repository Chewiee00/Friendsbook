import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friendslist: {type: Array, default: []},
  friendrequests: {type: Array, default:[]},
  sent_friendrequests: {type: Array, default:[]}
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}


mongoose.model("User", UserSchema);
