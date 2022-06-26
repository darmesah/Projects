const express = require('express');
const router = new express.Router();
const Book = require('../models/book');

// Add a book
router.post('/books', async (req, res) => {
  const books = await Book.find({});
  const book_id = books.length + 1;
  const book = new Book({
    book_id,
    ...req.body,
  });

  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all Books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
    console.log(books.length);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Get a Book
router.get('/books/:book_id', async (req, res) => {
  const book_id = req.params.book_id;
  try {
    const book = await Book.findOne({ book_id });
    res.send(book);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Update a book
router.patch('/books/:book_id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const book = await Book.findOneAndUpdate({ book_id: req.params.book_id }, req.body, { new: true, runValidators: true });

    if (!book) {
      return res.status(404).send();
    }

    res.send(book);
  } catch (error) {
    return res.status(404).send;
  }
});

// Delete a Book
router.delete('/books/:book_id', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ book_id: req.params.book_id });

    if (!book) {
      res.status(404).send();
    }

    res.status(200).send(book);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
