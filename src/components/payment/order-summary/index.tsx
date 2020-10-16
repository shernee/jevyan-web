import React from 'react'
import { orderSummaryShape, bannerShape, summaryItemShape } from '../../../data/type'
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
  let totalOrder: number = 0
  totalOrder = order.items.reduce((sum: number, prev: summaryItemShape) => sum + prev.price, 0)
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
                {orderItem.item}
                &nbsp;
                {`(x ${orderItem.quantity})`}
              </div>
              <div className="summary-item-choices">
                {orderItem.choices.join(',')}
              </div>
            </div>
            <div className="order-prices">
              {localBanner.currency}
              &nbsp;
              {orderItem.price}
            </div>
          </div>
        ))}
        <div className="summary-total-row">
          <div className="summary-total-label">
            Total
          </div>
          <div className="summary-total-price">
            {localBanner.currency}
            &nbsp;
            {totalOrder}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
