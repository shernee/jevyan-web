import React from 'react'
import { Link } from '@reach/router'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import './index.css'
import ItemDetails from '../menu-card/items'

interface CategoryProps {
  cartTotal: number;
}

const CategoryHeader = (props: CategoryProps) => {
  const {
    cartTotal,
  } = props
  const categories: Array<string> = Object.keys(ItemDetails)
  const screenWidth = window.innerWidth
  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <div className="container-fluid px-0">
        <ul className="nav navbar-nav">
          {categories.map((category, catIndex) => (
            <li key={catIndex.toString()}><a href={`#${category}`}>{category}</a></li>
          ))}
        </ul>
        {(screenWidth > 768) && (
          <div className="cart-link">
            <Link to="/cart">
              <RestaurantMenuIcon style={{ fontSize: 32, color: '#9B26B6', verticalAlign: 'top' }} />
              <span className="cart-total">
                {cartTotal}
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default CategoryHeader
