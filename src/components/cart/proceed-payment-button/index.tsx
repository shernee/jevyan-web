/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { bannerShape } from '../../../data/type'
import {
  bannerFromStorage,
} from '../../../helper/helper'
import './index.css'

interface PaymentButtonProps {
  payQuantity: number;
  payPrice: number;
}

const PaymentButton = (props: PaymentButtonProps) => {
  const {
    payQuantity, payPrice,
  } = props
  const localBanner: bannerShape = bannerFromStorage()

  return (
    <button type="button" className="btn btn-dark rounded-0">
      <div className="payment-button-quantity">
        {payQuantity}
      </div>
      <div className="payment-label">
        Proceed to Payment
      </div>
      <div className="payment-button-price">
        {`${localBanner.currency} ${payPrice}`}
      </div>
    </button>
  )
}

export default PaymentButton

