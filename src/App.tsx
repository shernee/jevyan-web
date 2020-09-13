import React from 'react'
import { Router } from '@reach/router'
import AddItem from './pages/add-item'
import HeaderNav from './components/header-nav/index'
import './App.css'

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Router>
        <AddItem path="/" />
      </Router>
    </div>
  )
}

export default App
