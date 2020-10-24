const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create SCHEMA
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength:50,
  },
  password: {
    type: String,
    required: true,    
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
