/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import { RouteComponentProps, navigate } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import TextField from '@material-ui/core/TextField'
import QuantityDropdown from '../../components/cart/quantity-dropdown'
import CartItemDetails from '../../components/cart/cart-item-details'
import PaymentButton from '../../components/cart/proceed-payment-button'
import {
  cartShape, bannerShape, orderShape, orderSummaryShape, deliveryShape,
} from '../../data/type'
import {
  cartFromStorage, cartToStorage, bannerFromStorage, deliveryFromStorage, orderToStorage,
} from '../../helper/helper'
import './index.css'

const cartToOrder = (stateCart: Array<cartShape>, instructions: string) => {
  const items = stateCart.map((cartItem: cartShape) => {
    const {
      itemId: item_id,
      cartQuantity: quantity,
    } = cartItem
    let choices: Array<number> = []
    if (cartItem.itemChoices.length > 0) {
      const groupchoices = cartItem.itemChoices.map((choice) => choice.choiceId)
      choices = groupchoices.flat()
    }
    return { item_id, choices, quantity }
  })
  const is_pickup: boolean = false
  const dueDate: deliveryShape = deliveryFromStorage()
  const dueTime = dueDate.time.split('-')[0]
  const dueDT = `${dueDate.day} ${dueTime}`
  const dueObj = moment.tz(dueDT, 'dddd, MMM Do hh:mm A', 'Asia/Kolkata')
  const due = dueObj.format()
  return {
    instructions, items, is_pickup, due,
  }
}

export default function Cart(props: RouteComponentProps) {
  const initCart: Array<cartShape> = cartFromStorage()
  const localBanner: bannerShape = bannerFromStorage()
  const [StateCart, setStateCart] = React.useState<Array<cartShape>>(initCart)
  const [CartEmpty, setCartEmpty] = React.useState<boolean>(!initCart.length)
  const [Instructions, setInstructions] = React.useState<string>('')

  const initPayQuantity = StateCart.reduce(
    (prev: number, next: cartShape) => prev + next.cartQuantity, 0,
  )
  const initPayPrice = StateCart.reduce((prev: number, next: cartShape) => prev + next.cartPrice, 0)
  const [PayQuantity, setPayQuantity] = React.useState<number>(initPayQuantity)
  const [PayPrice, setPayPrice] = React.useState<number>(initPayPrice)

  const handleCancelPage = () => {
    navigate('/')
  }

  const handleQuantityChange = (dropdownQuantity: number, cartIndex: number) => {
    const localCart: Array<cartShape> = [...StateCart]
    localCart[cartIndex].cartQuantity = dropdownQuantity
    const currItemPrice = localCart[cartIndex].itemFinalPrice
    localCart[cartIndex].cartPrice = currItemPrice * dropdownQuantity
    const updatedPayQuantity = localCart.reduce(
      (prev: number, next: cartShape) => prev + next.cartQuantity, 0,
    )
    const updatedPayPrice = localCart.reduce(
      (prev: number, next: cartShape) => prev + next.cartPrice, 0,
    )
    cartToStorage(localCart)
    setStateCart(localCart)
    setPayQuantity(updatedPayQuantity)
    setPayPrice(updatedPayPrice)
  }

  const deleteFromCart = (removeIndex: number, e: any) => {
    const localCart: Array<cartShape> = [...StateCart]
    localCart.splice(removeIndex, 1)
    const updatedPayQuantity = localCart.reduce(
      (prev: number, next: cartShape) => prev + next.cartQuantity, 0,
    )
    const updatedPayPrice = localCart.reduce(
      (prev: number, next: cartShape) => prev + next.cartPrice, 0,
    )
    cartToStorage(localCart)
    setStateCart(localCart)
    setPayQuantity(updatedPayQuantity)
    setPayPrice(updatedPayPrice)
    if (localCart.length === 0) setCartEmpty(true)
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstructions(event.target.value)
  }

  const handlePaymentClick = () => {
    const cartOrder: orderShape = cartToOrder(StateCart, Instructions)
    const store = window.location.hostname.split('.')[0]
    const {
      instructions,
      is_pickup,
      due,
    } = cartOrder
    const items = JSON.stringify(cartOrder.items)
    const orderUrl = `${window.location.origin}/api/sales/orders/`
    const addOrder = async () => {
      try {
        const orderResp = await axios.post(orderUrl, {
          store,
          instructions,
          items,
          is_pickup,
          due,
        })
        const orderData: orderSummaryShape = orderResp.data
        orderToStorage(orderData)
        navigate('/payment')
      } catch (error) {
        console.log(error.error)
      }
    }
    addOrder()
  }
  return (
    <div className="container-fluid px-0">
      <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
        <CancelOutlinedIcon fontSize="large" />
      </div>
      <div className="cart-container">
        <div className="cart-header">
          <h3>
            {CartEmpty ? 'Cart is Empty' : 'Your Order'}
          </h3>
        </div>
        {(!CartEmpty) && (
          <>
            <div className="cart-item-section">
              {StateCart.map((cartItem, index) => (
                <div key={index.toString()} className="cart-item-row">
                  <QuantityDropdown
                    cartIndex={index}
                    cartQuantity={cartItem.cartQuantity}
                    handleQuantityChange={handleQuantityChange}
                  />
                  <CartItemDetails
                    cartItem={cartItem}
                    currency={localBanner.currency}
                  />
                  <div className="cart-item-currency">
                    {localBanner.currency}
                  </div>
                  <div className="cart-item-price">
                    {cartItem.cartPrice}
                  </div>
                  <div className="remove-cart-item">
                    <DeleteForeverRoundedIcon onClick={(e) => deleteFromCart(index, e)} />
                  </div>
                </div>
              ))}
              <div className="bottom-instructions">
                <TextField
                  id="standard-textarea"
                  label="Additional instructions (optional)"
                  placeholder="Extra sauce, Less sugar etc"
                  multiline
                  onChange={handleNoteChange}
                />
              </div>
            </div>
            <div className="cart-bottom-sticky-button" role="button" tabIndex={0} onClick={handlePaymentClick}>
              <PaymentButton payQuantity={PayQuantity} payPrice={PayPrice} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
