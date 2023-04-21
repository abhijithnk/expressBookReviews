const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login" + JSON.stringify(users,null,4)});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Get the book list available in the shop
/*
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});
*/
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve,reject) => {
        let filtered_books =[];
        for (let isbn in books) {
            let book = books[isbn];
            filtered_books.push(book.title);
            resolve(filtered_books);
        }
    })
    //Console log before calling the promise
    console.log("Before calling promise");
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        //console.log("From Callback " + successMessage);
        return res.send(JSON.stringify(successMessage,null,4));
    }) 
});


// Get book details based on ISBN
/*
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
*/
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
        resolve("Promise resolved")
        },6000)})
    //Console log before calling the promise
    console.log("Before calling promise");
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage);
        const isbn = req.params.isbn;
        return res.send(books[isbn]);
    }) 
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  //let filtered_books = books.filter((book) => {author === book.author});
  //res.send(filtered_books);
  let filtered_books =[];
  for (let isbn in books) {
    //console.log(isbn);
    let book = books[isbn];
    if (book["author"] === author) {
        //return res.send(book);
        filtered_books.push(book);
    }
  }
  return res.send(filtered_books);
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_books =[];
  for (let isbn in books) {
    let book = books[isbn];
    if (book["title"] === title) {
        //return res.send(book);
        filtered_books.push(book);
    }
  }
  return res.send(filtered_books);
  //let filtered_books = books.filter((book) => {title === book.title});
  //res.send(filtered_books);
  //return res.status(300).json({message: "Yet to be implemented"});
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]["reviews"]);
  //return res.status(300).json({message: "Yet to be implemented"});
});
module.exports.general = public_users;