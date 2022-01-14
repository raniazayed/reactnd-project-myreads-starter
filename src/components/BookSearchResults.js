import React from 'react';
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import PropTypes from 'prop-types'; 

const BookSearchResults = (props) => {
    
    BookSearchResults.propTypes = {
        searchBookResults: PropTypes.array.isRequired,
        shelfChanged: PropTypes.func.isRequired,
    }
    const { searchBookResults, shelfChanged } = props;


    const bookStatusChange = (book, bookStatus) => {
        BooksAPI.update(book, bookStatus).then((res) => {
            shelfChanged();
        });
    };

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {searchBookResults.length > 0 &&
                    searchBookResults.map((searchedBook) => {
                        return (
                            <li key={searchedBook.id}>
                                <Book
                                    book={searchedBook}
                                    onBookStatusChange={bookStatusChange}
                                />
                            </li>
                        );
                    })}
            </ol>
        </div>
    )
}
export default BookSearchResults;