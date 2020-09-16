import React from 'react'
import { Link } from '@reach/router'
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined'
import './index.css'
import ItemDetails from '../menu-card/items'

export default function CategoryHeader() {
  const categories: Array<string> = Object.keys(ItemDetails)
  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <div className="container-fluid px-0">
        <ul className="nav navbar-nav">
          {categories.map((category, catIndex) => (
            <li key={catIndex.toString()}><a href={`#${category}`}>{category}</a></li>
          ))}
        </ul>
        <div className="cart-link">
          <Link to="/cart">
            <ShoppingBasketOutlinedIcon fontSize="large" style={{ color: 'red' }} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
