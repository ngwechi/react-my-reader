import React from 'react'
import './App.css'

import BookList from './BookList'
import SearchBook from './SearchBook'
import {Route} from 'react-router-dom'


class BooksApp extends React.Component {
  

  render() {
    return (
      <div className="app">
        <Route path="/" exact component={BookList}/>
        <Route path="/search" component={SearchBook}/>
      </div>
    )
  }
}

export default BooksApp
