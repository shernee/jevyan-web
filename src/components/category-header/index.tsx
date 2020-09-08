import React from 'react'
import './index.css'

export default function CategoryHeader() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <ul className="nav navbar-nav">
          <li className="active">Home</li>
          <li><a href="#Regular">Regular</a></li>
          <li><a href="#Specials">Specials</a></li>
        </ul>
      </div>
    </nav>
  )
}
