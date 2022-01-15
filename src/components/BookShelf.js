import React from 'react';
import PropTypes from 'prop-types'; 
import Book from './Book';
import * as BooksAPI from '../BooksAPI'

const BookShelf = (props) => {

    BookShelf.propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired,
    }
    
    const {title, books} = props;

    const bookStatusChange = (book, bookStatus) => {
        BooksAPI.update(book, bookStatus).then((res)=>{
            props.onShelfChanged(book, bookStatus);
        })
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(book => {
                            return <li key={book.id}>
                                <Book
                                 book = {book}
                                 onBookStatusChange = {bookStatusChange}
                                />
                            </li>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;