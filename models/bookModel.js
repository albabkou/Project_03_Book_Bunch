// importing pg-promise from the config file
const db = require('../db/config');

// creating a model object
const Book = {};

// creating the findAll method to find all books in the database
Book.findAll = () => {
    return db.query('SELECT * FROM books ORDER BY id DESC');
};

// creating the findByIsbn method
Book.findByIsbn = isbn => {
    return db.oneOrNone('SELECT * FROM books WHERE isbn = $1', [isbn]);
};

// creating the create new book method
Book.create = book => {
    return db.one(
        `
        INSERT INTO books
        (title, author, genre, isbn, description, rating, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `
        [book.title, book.author, book.genre, book.isbn, book.description, book.rating, book.image_url]
    );
};

// exporting the book model
module.exports = Book;