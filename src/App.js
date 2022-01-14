import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, Link } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import BookShelf from "./components/BookShelf";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  };
  const shelfChanged = () => {
    getAllBooks();
  };

  return (
    <Routes>
      {/* Search Page */}
      <Route
        path="/search"
        element={
          <BookSearch books={books} shelfChanged={shelfChanged} />}
      ></Route>

      {/* Books Page */}
      <Route
        exact
        path="/"
        element={
          <div className="list-books">
            {/* Title */}
            <Header />
            <div className="list-books-content">
              <div>
                {/* Currently Reading Shelf */}
                <BookShelf
                  title="Currently Reading"
                  books={books.filter(
                    (book) => book.shelf === "currentlyReading"
                  )}
                  onShelfChanged={shelfChanged}
                />

                {/* Want to Read  */}
                <BookShelf
                  title="Want to Read"
                  books={books.filter((book) => book.shelf === "wantToRead")}
                  onShelfChanged={shelfChanged}
                />

                {/* Read  */}
                <BookShelf
                  title="Read"
                  books={books.filter((book) => book.shelf === "read")}
                  onShelfChanged={shelfChanged}
                />
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default App;
