const mongoose = require("mongoose")

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "please, add a text filled"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model("Idea", IdeaSchema)
