const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{
    text: {
      type: String,
      required: true,
    }
  }],
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.comments && returnedObject.comments.length > 0) {
      returnedObject.comments.forEach(comment => {
        comment.id = comment._id.toString();
        delete comment._id;
      });
    }
  },
})

module.exports = mongoose.model("Blog", blogSchema)
