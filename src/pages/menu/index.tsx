/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import Banner from '../../components/menu/banner'
import CategoryHeader from '../../components/menu/category-header'
import MenuCard from '../../components/menu/menu-card'
import './index.css'

interface ICart {
  id: string;
  quantity: number;
  totalPrice: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Menu(props: RouteComponentProps) {
  const screenWidth = window.innerWidth
  const stringCart: any = localStorage.getItem('cart')
  const localCart: Array<ICart> = JSON.parse(stringCart)
  let total: number = 0
  let cartPrice: number = 0
  if (localCart) {
    total = localCart.reduce((prev: number, next: ICart) => prev + next.quantity, 0)
    cartPrice = localCart.reduce((prev: number, next: ICart) => prev + next.totalPrice, 0)
  }
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
                  {`Rs ${cartPrice}`}
                </div>
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
