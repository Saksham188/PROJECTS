// here initially we didnt applied sockets so we sending our message to backend.
const mongoose = require("mongoose");

// here we creating mongoose object Schema
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      // mongoose.Schema.Types is just a configuration object for mongoose.object id is id in mongoose
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //reference=users
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same as how we create const object =mongoose.model here we doing module.exports
module.exports = mongoose.model("Messages", messageSchema);
