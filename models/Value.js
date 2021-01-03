const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create SCHEMA
const ValueSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "Project" },
  DmId: { type: Schema.Types.ObjectId, ref: "Dm" },
  AlternativeId: { type: Schema.Types.ObjectId, ref: "Alternative" },
  CriteriaId: { type: Schema.Types.ObjectId, ref: "Criteria" },
  Input: {
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
