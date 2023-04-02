const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
    transform: (document, resturnedObject) => {
        resturnedObject.id = resturnedObject._id.toString()
        delete resturnedObject._id
        delete resturnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)