'use strict';


const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  descripton: { type: String, required: true },
  img_URL: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const BookModel = mongoose.model('book', bookSchema);

module.exports = BookModel;