import React from 'react'
import axios from 'axios'
import { Router } from '@reach/router'
import Menu from './pages/menu'
import AddItem from './pages/add-item'
import Cart from './pages/cart'
import './App.css'

function App() {
  React.useEffect(() => {
    const subDomain = window.location.hostname.split('.')[0]
    const bannerUrl = `${window.location.origin}/api/org/banner/${subDomain}/`
    const loadData = async () => {
      const bannerResponse = await axios.get(bannerUrl)
      document.title = bannerResponse.data.name
    }
    loadData()
  }, [])
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
