/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import './index.css'

export default function Cart(props: RouteComponentProps) {
  return (
    <div className="wrapper">
      <div className="cart-header">
        <h3>
          Your Order
        </h3>
      </div>
    </div>
  )
}
