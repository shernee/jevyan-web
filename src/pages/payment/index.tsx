/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import { RouteComponentProps, navigate } from '@reach/router'
import CustomerDetails from '../../components/payment/customer-details'
import EmailModal from '../../components/payment/email-modal'
import { deliveryFromStorage } from '../../helper/helper'
import { deliveryShape, formShape } from '../../data/type'
import './index.css'

export default function Payment(props: RouteComponentProps) {
  const localDelivery: deliveryShape = deliveryFromStorage()
  const initValues: formShape = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    landmark: '',
    neighborhood: '',
    city: '',
    state: '',
    day: localDelivery.day,
    time: localDelivery.time,
  }
  const [FormValues, setFormValues] = React.useState(initValues)

  const handleCancelPage = () => {
    navigate('/')
  }

  return (
    <div className="container-fluid px-0">
      <div className="payment-section">
        <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
          <CancelOutlinedIcon fontSize="large" />
        </div>
        <div className="payment-details-wrapper">
          <CustomerDetails formValues={FormValues} />
          <h3>Order Summary</h3>
          <h3>Payment Option</h3>
        </div>
      </div>
    </div>
  )
}
