/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import TextField from '@material-ui/core/TextField'
import QuantityDropdown from '../../components/cart/quantity-dropdown'
import CartItemDetails from '../../components/cart/cart-item-details'
import PaymentButton from '../../components/cart/proceed-payment-button'
import { cartShape, bannerShape } from '../../data/type'
import {
  cartFromStorage, cartToStorage, bannerFromStorage,
} from '../../helper/helper'
import './index.css'

export default function Cart(props: RouteComponentProps) {
  const initCart: Array<cartShape> = cartFromStorage()
  const localBanner: bannerShape = bannerFromStorage()
  const [StateCart, setStateCart] = React.useState<Array<cartShape>>(initCart)
  const [CartEmpty, setCartEmpty] = React.useState<boolean>(!initCart.length)
  const [Instructions, setInstructions] = React.useState<string>('')

  const initPayQuantity = StateCart.reduce((prev: number, next: cartShape) => prev + next.cartQuantity, 0)
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
    const updatedPayQuantity = localCart.reduce((prev: number, next: cartShape) => prev + next.cartQuantity, 0)
    const updatedPayPrice = localCart.reduce((prev: number, next: cartShape) => prev + next.cartPrice, 0)
    cartToStorage(localCart)
    setStateCart(localCart)
    setPayQuantity(updatedPayQuantity)
    setPayPrice(updatedPayPrice)
  }

  const deleteFromCart = (removeIndex: number, e: any) => {
    const localCart: Array<cartShape> = [...StateCart]
    localCart.splice(removeIndex, 1)
    const updatedPayQuantity = localCart.reduce((prev: number, next: cartShape) => prev + next.cartQuantity, 0)
    const updatedPayPrice = localCart.reduce((prev: number, next: cartShape) => prev + next.cartPrice, 0)
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
    navigate('/payment')
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
                  <CartItemDetails cartItem={cartItem} />
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
            <div className="bottom-sticky-button" role="button" tabIndex={0} onClick={handlePaymentClick}>
              <PaymentButton payQuantity={PayQuantity} payPrice={PayPrice} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
