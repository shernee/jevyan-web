/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, Link, useParams } from '@reach/router'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import './index.css'

const SuccessfulOrder = (props: RouteComponentProps) => {
  const params = useParams()
  const orderId = params['order-id']
  const showId = orderId.split('_')[1]
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
      <Link to="/" className="order-success-link">
        Place a new order
      </Link>
    </div>
  )
}

export default SuccessfulOrder
