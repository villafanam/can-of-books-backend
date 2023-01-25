'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// **** REQUIRE IN OUR MODEL *****
const Book = require('./models/book.js');

// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

//mongoosse status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// *******************************

const app = express();

//middleware
app.use(cors());

// ! DON'T FORGET TO USE THIS!!! - MIDDLEWARE TO PARSE JSON DATA FROM THE REQUEST.BODY
app.use(express.json());

const PORT = process.env.PORT || 3002;

// ENDPOINT
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// ***** ENDPOINT TO GET ALL THE BOOKS FROM MY DATABASE *****
app.get('/books', getBooks);

async function getBooks (request, response, next)
{
  try {
    let allBooks = await Book.find({}); // Model.find({}) - gets all the docs from the database
    // console.log(allBooks);
    response.status(200).send(allBooks);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


// **** ENDPOINT TO ADD A BOOK *****
app.post('/books', postBook);

async function postBook(request, response,next)
{
  try {
    let createdBook = await Book.create(request.body);
    // !!! DON'T FORGET THAT MIDDLEWARE ^ ^ ^ ^(line 32)

    response.status(200).send(createdBook);
  } 
  catch (error) 
  {
    console.log(error.message);
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
