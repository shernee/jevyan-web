/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, Link, useParams } from '@reach/router'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import {
  customerFromStorage,
} from '../../helper/helper'
import {
  customerShape,
} from '../../data/type'
import './index.css'

const storageRemove = () => {
  const storage = ['items', 'banner', 'delivery', 'cart', 'order']
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < storage.length; i++) {
    localStorage.removeItem(storage[i])
  }
}

const SuccessfulOrder = (props: RouteComponentProps) => {
  const params = useParams()
  const orderId = params['order-id']
  const showId = orderId.split('_')[1]
  const localCustomer: customerShape = customerFromStorage()
  storageRemove()
  return (
    <div className="order-success-wrapper">
      <CheckCircleRoundedIcon style={{ fontSize: 40, color: '#ff4400' }} />
      <div className="order-success-header">
        <h1>
          Your order is successful
        </h1>
      </div>
      <p className="order-success-id">
        {`Your order id is ${showId}`}
      </p>
      <p>
        {`Order details have been sent to ${localCustomer.email}`}
      </p>
      <Link to="/" className="order-success-link">
        Go back to menu
      </Link>
    </div>
  )
}

export default SuccessfulOrder
