const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create SCHEMA
const ProjectSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = Project = mongoose.model("project", ProjectSchema);
