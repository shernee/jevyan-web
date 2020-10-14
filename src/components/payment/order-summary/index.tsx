import React from 'react'
import { orderSummaryShape, bannerShape } from '../../../data/type'
import { bannerFromStorage } from '../../../helper/helper'
import './index.css'

interface OrderSummaryProps {
  order: orderSummaryShape;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const {
    order,
  } = props
  const {
    items,
  } = order
  const localBanner: bannerShape = bannerFromStorage()
  return (
    <div className="order-summary-section">
      <div className="summary-header">
        <h4>
          Order Summary
        </h4>
      </div>
      <div className="summary-body">
        {items.map((orderItem, index) => (
          <div key={index.toString()} className="summary-item-row">
            <div className="order-item-names">
              <div className="summary-item-name">
                {orderItem.item} {`(x ${orderItem.quantity})`}
              </div>
              <div className="summary-item-choices">
                {orderItem.choices.join(',')}
              </div>
            </div>
            <div className="order-prices">
              {localBanner.currency} {orderItem.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderSummary
