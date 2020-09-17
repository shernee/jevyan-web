import React from 'react'
import { Link } from '@reach/router'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import './index.css'
import ItemDetails from '../menu-card/items'

interface IDict {
  id: string,
  quantity: string,
}

export default function CategoryHeader() {
  const categories: Array<string> = Object.keys(ItemDetails)
  let localCart: any = localStorage.getItem('cart')
  localCart = JSON.parse(localCart)
  let total: number = 0
  if (localCart) total = localCart.reduce((prev: IDict, next: IDict) => prev + next.quantity, 0)
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
            <RestaurantMenuIcon style={{ fontSize: 32, color: '#9B26B6', verticalAlign: 'top' }} />
            <span className="cart-total">
              {total}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
