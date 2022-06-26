const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    book_id: {
      type: Number,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
