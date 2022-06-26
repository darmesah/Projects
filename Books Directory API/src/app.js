const express = require('express');
require('./db/mongoose');
const bookRouter = require('./routers/book');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bookRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
