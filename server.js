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

// **** ENDPOINT TO DELETE A BOOK ******
// ! we must have a path parameter
// ! we will use a variable to capture the ID
// ! to create the variable we use the ':' and add a variable name
app.delete('/books/:bookID', deleteBook);

async function deleteBook(request,response,next){
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

//  ***** ENDPOINT TO UPDATE/PUT A BOOK *****
app.put('/books/:bookID', updatedBook);

async function updatedBook(request, response, next)
{
  try {
    // ! path parameter - id of the cat to update
    // ! request.body - data to update the cat with
    // ! { new: true, overwrite: true } - option object for findByIdAndUpdate()

    let id = request.params.bookID;
    let data = request.body;
    let options = {new: true, overwrite: true };

    // ! findByIdAndUpdate - 3 args
    // ! 1st is the id of the thing to update
    // ! 2nd is the update data
    // ! 3rd is an option object - { new: true, overwrite: true }
    const updatedBook = await Book.findByIdAndUpdate(id, data, options);

    response.status(200).send(updatedBook);
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
