import React, { useState } from "react";
import PropTypes from 'prop-types'; 

const Book = (props) => {
  const {book} = props;
    Book.propTypes = {
        book: PropTypes.object.isRequired,
        onBookStatusChange: PropTypes.func.isRequired,
    }

  const bookShelfStatus = book && book.shelf ? book.shelf : "none";
  const [bookStatus, setBookStatus] = useState(bookShelfStatus);

  const shelfStatuses = [
    { value: "currentlyReading", title: "Currently Reading" },
    { value: "wantToRead", title: "Want to Read" },
    { value: "read", title: "Read" },
    { value: "none", title: "None" },
  ];
  const onChangeBookStatus = (e) => {
    setBookStatus(e.target.value);
    props.onBookStatusChange(book, e.target.value);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={onChangeBookStatus} value={bookStatus}>
            <option value="move" disabled>
              Move to...
            </option>
            {shelfStatuses.map((shelfStatus) => {
              return (
                <option key={shelfStatus.value} value={shelfStatus.value}>
                  {shelfStatus.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>

      <div className="book-authors">
            {book && book.authors && book.authors.map((author, index) => {
                return <span key={index}>{author} <br/></span> 
            })}
        </div>
    </div>
  );
};
export default Book;
