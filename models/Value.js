const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create SCHEMA
const ValueSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "Project" },
  dmId: { type: Schema.Types.ObjectId, ref: "Dm" },
  alternativeId: { type: Schema.Types.ObjectId, ref: "Alternative" },
  criteriaId: { type: Schema.Types.ObjectId, ref: "Criteria" },
  input: {
    type: String,
    required: true,
    maxlength: 20,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Value = mongoose.model("value", ValueSchema);
