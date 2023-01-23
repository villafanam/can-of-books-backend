'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed()
{
    // **title: {type: String, required: true},
    // **descripton: {type: String, required: true},
    // **status: {type: Boolean, required: true}

    await Book.create({
        title: 'Moby Dick',
        descripton: 'Life long hunt for the giant white whale',
        status: true
    });

    console.log('Moby Dick was created')

    await Book.create({
        title: 'James and the Gaint Peach',
        descripton: 'Orpahn enbarks on journey to New York in a gaint peach, with his new buggy friends',
        status: true
    });

    console.log('James and the Gaint Peach was created')

    await Book.create({
        title: 'Huckleberry Finn',
        descripton: 'Huckleberry enbarks many adventures with his good friend Tom Sawyer',
        status: true
    });

    console.log('Huckleberry Finn was created')

    mongoose.disconnect();
}

seed();