import React from 'react'
import { Router } from '@reach/router'
import Menu from './pages/menu'
import AddItem from './pages/add-item'
import Cart from './pages/cart'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router basepath="/">
        <Menu path="/" />
        <AddItem path="/add-item/:item-id" />
        <Cart path="/cart" />
      </Router>
    </div>
  )
}

export default App
/*
        <Cart path="/cart" />
        */
