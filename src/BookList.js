import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookTitle extends Component {
    render () {
        return (
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
        )
    }
}

class Book extends Component {

    render () {
        var {book,changeShelf }= this.props
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


class BookShelf extends Component {

    render () {
        var booklist = this.props.booklist;
        var changeShelf = this.props.changeShelf;
        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            booklist.map((book)=>(
                                <Book book={book} key={book.id} changeShelf={changeShelf}/>
                            ))
                        }
                    </ol>
                  </div>
                </div>
        )
    }
}



class BookList extends Component {

    state = {
      allBooks:[]

    }

    componentDidMount () {
        BooksAPI.getAll().then((allBooks)=>{
        this.setState({allBooks})
        })
    }

    changeShelf = (book,shelf) => {
        BooksAPI.update(book,shelf).then(()=>{
            BooksAPI.getAll().then((allBooks)=>{
            this.setState({allBooks})
            })
        });
        
    }

    // componentDidUpdate (prevProps, prevState) {
    //     BooksAPI.getAll().then((allBooks)=>{
    //     this.setState({allBooks})
    //     })
    // }
    render () {
        
        var myBooks = {currentlyReading:[],read:[],wantToRead:[]}
        this.state.allBooks.forEach(function(book) {
            myBooks[book.shelf].push(book);
        }, this);
        
        return (

            <div className="list-books">
            <BookTitle title="MyReads" />
            <div className="list-books-content">
              <div>
                  <BookShelf title="Currently Reading" booklist={myBooks.currentlyReading} changeShelf={this.changeShelf}key="currentlyReading" />
                  <BookShelf title="Reading" booklist={myBooks.read} changeShelf={this.changeShelf} key="read" />
                  <BookShelf title="Want To Read" booklist={myBooks.wantToRead} changeShelf={this.changeShelf} key="wantToReadread" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default BookList