import React, { useState } from "react";
import PropTypes from 'prop-types'; 
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import BookSearchResults from './BookSearchResults'
const BookSearch = (props) => {

  BookSearch.propTypes = {
    books: PropTypes.array.isRequired,
    shelfChanged: PropTypes.func.isRequired,
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBookResults, setSearchBookResults] = useState([]);
  const [error, setError] = useState(false);

  const onBookSearch = (e) => {
    searchBook(e.target.value);
  };

  const searchBook = (query) => {
    setSearchQuery(query);
    if (query.trim().length) getSearchResults(query);
    else setSearchBookResults([]);
  };

  const getSearchResults = (query) =>  {
    BooksAPI.search(query)
    .then((searchResults) => {
      setError(false);
      const searcedResults = [...searchResults];
      searcedResults.forEach((result) => {
        props.books.forEach((book) => {
          if (result.id === book.id) {
            const shelfId = props.books.findIndex(
              (book) => book.id === result.id
            );
            result.shelf = props.books[shelfId].shelf;
          }
        });
      });

      setSearchBookResults([...searcedResults]);
    })    
    .catch(error => {
      setError(true)
      setSearchBookResults([])});
  }

  const shelfChanged = (book,bookStatus) => {
    props.shelfChanged(book,bookStatus)
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
          <input
            value={searchQuery}
            onChange={onBookSearch}
            type="text"
            placeholder="Search by title or author"
          />

        </div>
      </div>



      <BookSearchResults
      searchBookResults = {searchBookResults}
      shelfChanged = {shelfChanged}
      />
  
     {error && <p style={{textAlign:'center', color:'red'}}>No match results</p>}

    </div>
  );
};

export default BookSearch;
