import React from 'react'
import './index.css'

export default function CategoryHeader() {
  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <ul className="nav navbar-nav">
        <li><a href="#Regular">Regular</a></li>
        <li><a href="#Specials">Specials</a></li>
      </ul>
    </nav>
  )
}
