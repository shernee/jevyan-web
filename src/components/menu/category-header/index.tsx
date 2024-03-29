/* eslint-disable no-console */
import React from 'react'
import { Link } from '@reach/router'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import './index.css'
import { categoryShape } from '../../../data/type'

interface ICategoryProps {
  categories: Array<categoryShape>;
  cartQuantity: number;
}

export default function CategoryHeader(props: ICategoryProps) {
  const {
    categories, cartQuantity,
  } = props
  const screenWidth = window.innerWidth
  return (
    <nav className="navbar px-0 sticky-top navbar-expand navbar-custom">
      <div className="container-fluid px-0">
        <ul className="nav navbar-nav">
          {categories.map((category) => (
            <li key={category.id}><a href={`#${category.name}`}>{category.name}</a></li>
          ))}
        </ul>
        {(screenWidth > 768) && (
          <Link to="/cart" className="cart-link">
            <RestaurantMenuIcon style={{ fontSize: 32, color: '#9B26B6', verticalAlign: 'top' }} />
            <span className="cart-total">
              {cartQuantity}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
