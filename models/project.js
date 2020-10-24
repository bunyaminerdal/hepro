const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create SCHEMA
const ProjectSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
    minlength:3,
    maxlength:30,
  },
  description: {
    type: String,
    maxlength:150,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = Project = mongoose.model("project", ProjectSchema);
