/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import { RouteComponentProps, navigate } from '@reach/router'
import CustomerDetails from '../../components/payment/customer-details'
import './index.css'

const handleCancelPage = () => {
  navigate('/')
}

export default function Payment(props: RouteComponentProps) {
  return (
    <div className="container-fluid px-0">
      <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
        <CancelOutlinedIcon fontSize="large" />
      </div>
      <div className="payment-wrapper">
        <CustomerDetails />
        <h3>Order Summary</h3>
        <h3>Payment Option</h3>
      </div>
    </div>
  )
}
