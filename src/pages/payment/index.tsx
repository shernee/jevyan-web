/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import axios from 'axios'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import { RouteComponentProps, navigate } from '@reach/router'
import CustomerDetails from '../../components/payment/customer-details'
import EmailModal from '../../components/payment/email-modal'
import OrderSummary from '../../components/payment/order-summary'
import {
  deliveryFromStorage, orderFromStorage, bannerFromStorage, customerFromStorage,
} from '../../helper/helper'
import {
  deliveryShape, formShape, orderSummaryShape, bannerShape, customerShape,
} from '../../data/type'
import './index.css'

interface IPaymentSucess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment(props: RouteComponentProps) {
  const localOrder: orderSummaryShape = orderFromStorage()
  const localBanner: bannerShape = bannerFromStorage()
  const localCustomer: customerShape = customerFromStorage()
  const localDelivery: deliveryShape = deliveryFromStorage()
  const [Order, setOrder] = React.useState<orderSummaryShape>(localOrder)
  const [Customer, setCustomer] = React.useState({
    amount: 0,
    email: '',
    name: '',
    payment_id: '',
    phone: 0,
    razorpay_id: '',
  })
  const [Disabled, setDisabled] = React.useState<boolean>(true)
  const initValues: formShape = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: localCustomer.street,
    landmark: localCustomer.landmark,
    neighborhood: localCustomer.neighborhood,
    city: localBanner.city,
    postal: localCustomer.postal,
    day: localDelivery.day,
    time: localDelivery.time,
  }
  const [FormValues, setFormValues] = React.useState(initValues)

  const handleCancelPage = () => {
    navigate('/')
  }

  const saveCustomer = (details: formShape) => {
    const {
      firstName: first_name,
      lastName: last_name,
      email,
      phone,
      street,
      landmark,
      neighborhood,
      city,
      postal,
    } = details
    const customerUrl = `${window.location.origin}/api/sales/customers/`
    const order = Order.id
    const { state } = localBanner
    const addCustomer = async () => {
      try {
        const customerResp = await axios.post(customerUrl, {
          first_name,
          last_name,
          email,
          phone,
          street,
          neighborhood,
          landmark,
          city,
          state,
          postal,
          order,
        })
        if (customerResp.data) {
          setCustomer(customerResp.data)
          setDisabled(false)
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    addCustomer()
  }

  const paymentHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const order = Order.id
    const orderUrl = `${window.location.origin}/api/sales/orders/${order}/`
    const custData = { ...Customer }
    const options = {
      key: custData.razorpay_id,
      name: localOrder.store,
      description: 'Food order payment',
      order_id: custData.payment_id,
      handler: async (response: IPaymentSucess) => {
        try {
          const pId = response.razorpay_payment_id
          let paymentResp
          if (pId) {
            paymentResp = await axios.get(orderUrl)
            const paymentStatus = paymentResp.data.status
            if (paymentStatus === 'paid') {
              navigate(`/order-success/${custData.payment_id}`)
            }
          }
        } catch (error) {
          console.log(error.response.data)
        }
      },
      prefill: {
        name: custData.name,
        email: custData.email,
        contact: custData.phone,
      },
      theme: {
        color: '#9B26B6',
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  return (
    <div className="container-fluid px-0">
      <div className="payment-section">
        <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
          <CancelOutlinedIcon fontSize="large" />
        </div>
        <div className="payment-details-wrapper">
          <CustomerDetails formValues={FormValues} saveCustomer={saveCustomer} payDisable={Disabled} />
          <OrderSummary order={Order} />
          <div className="payment-bottom-sticky-button" role="button" tabIndex={0}>
            <button type="button" className="btn btn-dark rounded-0" disabled={Disabled} onClick={paymentHandler}>
              <div className="payment-label">
                Pay Now
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
