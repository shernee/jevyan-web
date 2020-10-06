/* eslint-disable no-console */
import React from 'react'
import { Router } from '@reach/router'
import Menu from './pages/menu'
import AddItem from './pages/add-item'
import Cart from './pages/cart'
import Payment from './pages/payment'
import './App.css'

function App() {
  const idleTimer = () => {
    let overTime: number
    const reload = () => {
      // eslint-disable-next-line no-alert
      alert('will reload')
      window.location.reload()
    }

    const resetTimer = () => {
      clearTimeout(overTime)
      overTime = window.setTimeout(reload, 10 * 60 * 1000)
    }
    window.addEventListener('load', resetTimer, true)
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach((ev) => {
      document.addEventListener(ev, resetTimer, true)
    })
  }

  window.onload = idleTimer

  return (
    <div className="App">
      <Router basepath="/">
        <Menu path="/" />
        <AddItem path="/add-item/:item-id" />
        <Cart path="/cart" />
        <Payment path="/payment" />
      </Router>
    </div>
  )
}

export default App
/*
        <Cart path="/cart" />
        */
