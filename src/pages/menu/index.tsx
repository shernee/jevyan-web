/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import './index.css'

interface IDict {
  id: string,
  quantity: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Menu(props: RouteComponentProps) {
  const screenWidth = window.innerWidth
  let localCart: any = localStorage.getItem('cart')
  localCart = JSON.parse(localCart)
  let total: number = 0
  if (localCart) total = localCart.reduce((prev: IDict, next: IDict) => prev + next.quantity, 0)
  return (
    <div className="menu-page">
      <Banner />
      <div className="below-banner-section">
        <CategoryHeader cartTotal={total} />
        <MenuCard />
      </div>
      <div className="view-order-button">
        {(screenWidth < 768) && (total > 0) && (
          <Link to="/cart">
            <div className="bottom-sticky-button" role="button" tabIndex={0}>
              <button type="button" className="btn btn-dark rounded-0">
                <div className="total-quantity">
                  {total}
                </div>
                <div className="view-order-label">
                  View Order
                </div>
                <div className="total-price">
                  {total}
                </div>
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
