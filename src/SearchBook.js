import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class Book extends Component {

    render () {
        var {book,changeShelf }= this.props
        console.log(book);
        return (
            <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event)=>changeShelf(book,event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read" >Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.publisher}</div>
            </div>
            </li>
        )
    }
}


class SearchBook extends Component {
  state = {
      query:"",
      allBooks:[]
    }

    updateQuery = (query) => {
        this.setState({query:query.trim()})
        console.log(query);
        BooksAPI.search(query.trim(),new RegExp(escapeRegExp(query.trim()),'i')).then((allBooks)=>{
              this.setState({allBooks:allBooks})
              console.log(this.state.allBooks);
            });
    }

    changePlace = (book,shelf) => {
        
        BooksAPI.update(book,shelf).then(
            this.updateQuery(this.state.query)
        );
        
    }
    

    render () {

      var query = this.state.query;
      var books = this.state.allBooks;
        console.log(books);
        return (
          
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} onChange={(event)=>this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"> 
                  {
                        this.state.allBooks.map((book)=>(
                            <Book book={book} changeShelf={this.changePlace} key={book.id}/>
                        ))
                    }
                  
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook