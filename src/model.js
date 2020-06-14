const mongoose = require('mongoose')


const shortUrlSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
})

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const ShortURL = mongoose.model('ShortURL', shortUrlSchema)

module.exports = ShortURL