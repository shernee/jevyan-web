import React from 'react'
import './index.css'

export default function CategoryHeader() {
  return (
    <nav className="navbar sticky-top navbar-expand navbar-custom">
      <div className="container">
        <ul className="nav navbar-nav">
          <li><a href="#Regular">Regular</a></li>
          <li><a href="#Specials">Specials</a></li>
        </ul>
      </div>
    </nav>
  )
}
