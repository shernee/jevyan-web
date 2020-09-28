/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { bannerShape } from '../../../data/type'
import {
  bannerFromStorage,
} from '../../../helper/helper'
import './index.css'

interface ViewCartButtonProps {
  cartQuantity: number;
  cartPrice: number;
}

const ViewCartButton = (props: ViewCartButtonProps) => {
  const {
    cartQuantity, cartPrice,
  } = props
  const localBanner: bannerShape = bannerFromStorage()

  return (
    <button type="button" className="btn btn-dark rounded-0">
      <div className="view-cart-button-quantity">
        {cartQuantity}
      </div>
      <div className="view-cart-label">
        View Order
      </div>
      <div className="view-cart-button-price">
        {`${localBanner.currency} ${cartPrice}`}
      </div>
    </button>
  )
}

export default ViewCartButton
