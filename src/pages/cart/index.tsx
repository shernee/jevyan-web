/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import QuantityDropdown from '../../components/cart/quantity-dropdown'
import CartItemDetails from '../../components/cart/cart-item-details'
import { cartShape } from '../../data/type'
import './index.css'

export default function Cart(props: RouteComponentProps) {
  const stringCart: string | null = localStorage.getItem('cart')
  let localCart: Array<cartShape> = []
  if (stringCart) localCart = JSON.parse(stringCart)
  const [StateCart, setStateCart] = React.useState<Array<cartShape>>(localCart)
  const [cartEmpty, setCartEmpty] = React.useState(!stringCart)
  const handleCancelPage = () => {
    navigate('/')
  }
  const handleClearCart = () => {
    localStorage.removeItem('cart')
    setCartEmpty(!cartEmpty)
  }
  const handleQuantityChange = (dropdownQuantity: number, cartIndex: number) => {
    localCart[cartIndex].cartQuantity = dropdownQuantity
    setStateCart(localCart)
  }
  return (
    <div className="cart-container">
      <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
        <CancelOutlinedIcon fontSize="large" />
      </div>
      <div className="cart-header">
        <h3>
          {cartEmpty ? 'Cart is Empty' : 'Your Order'}
        </h3>
      </div>
      {(!cartEmpty) && (
        <>
          <button type="button" onClick={handleClearCart}>Clear Cart</button>
          {StateCart.map((cartItem, index) => (
            <div className="cart-item-section">
              <QuantityDropdown cartIndex={index} cartQuantity={cartItem.cartQuantity} handleQuantityChange={handleQuantityChange} />
              <CartItemDetails cartItem={cartItem} />
              <div className="cart-item-price">
                {`Rs ${cartItem.cartPrice}`}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
