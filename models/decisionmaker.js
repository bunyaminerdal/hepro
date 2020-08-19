const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create SCHEMA
const DmSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "Project" },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Dm = mongoose.model("decisionmaker", DmSchema);
