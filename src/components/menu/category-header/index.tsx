import React from 'react'
import './index.css'
import ItemDetails from '../menu-card/items'

export default function CategoryHeader() {
  const categories: Array<string> = Object.keys(ItemDetails)
  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <ul className="nav navbar-nav">
        {categories.map((category, catIndex) => (
          <li key={catIndex.toString()}><a href={`#${category}`}>{category}</a></li>
        ))}
      </ul>
    </nav>
  )
}
