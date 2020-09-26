/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './index.css'

interface ViewCartButtonProps {
  cartQuantity: number;
  cartPrice: number;
}

const ViewCarButton = (props: ViewCartButtonProps) => {
  const {
    cartQuantity, cartPrice,
  } = props
  return (
    <button type="button" className="btn btn-dark rounded-0">
      <div className="view-cart-button-quantity">
        {cartQuantity}
      </div>
      <div className="view-cart-label">
        View Order
      </div>
      <div className="view-cart-button-price">
        {`Rs ${cartPrice}`}
      </div>
    </button>
  )
}

export default ViewCarButton
