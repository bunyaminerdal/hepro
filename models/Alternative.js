const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create SCHEMA
const AlternativeSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "Project" },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Alternative = mongoose.model("alternative", AlternativeSchema);
