import React from 'react'
import { Router } from '@reach/router'
import Menu from './pages/menu'
/*
import Cart from './pages/cart'
import AddItem from './pages/add-item'
*/
import './App.css'

function App() {
  return (
    <div className="App">
      <Router basepath="/">
        <Menu path="/" />
      </Router>
    </div>
  )
}

export default App
/*
        <AddItem path="/add-item/:item-id" />
        <Cart path="/cart" />
        */
