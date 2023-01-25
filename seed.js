'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed()
{
    // **title: {type: String, required: true},
    // **description: {type: String, required: true},
    // **img_URL: { type: String, required: true },
    // **status: {type: Boolean, required: true}

    await Book.create({
        title: 'Moby Dick',
        description: 'Life long hunt for the giant white whale',
        img_URL: 'https://ychef.files.bbci.co.uk/976x549/p03gg1lc.jpg',
        status: true
    });

    console.log('Moby Dick was created')

    await Book.create({
        title: 'James and the Gaint Peach',
        description: 'Orpahn enbarks on journey to New York in a gaint peach, with his new buggy friends',
        img_URL: 'https://ychef.files.bbci.co.uk/976x549/p03gg1lc.jpg',
        status: true
    });

    console.log('James and the Gaint Peach was created')

    await Book.create({
        title: 'Huckleberry Finn',
        description: 'Huckleberry enbarks many adventures with his good friend Tom Sawyer',
        img_URL: 'https://ychef.files.bbci.co.uk/976x549/p03gg1lc.jpg',
        status: true
    });

    console.log('Huckleberry Finn was created')

    mongoose.disconnect();
}

seed();