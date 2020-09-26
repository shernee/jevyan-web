/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import QuantityDropdown from '../../components/cart/quantity-dropdown'
import CartItemDetails from '../../components/cart/cart-item-details'
import { cartShape } from '../../data/type'
import './index.css'

export default function Cart(props: RouteComponentProps) {
  const stringCart: string | null = localStorage.getItem('cart')
  let initCart: Array<cartShape> = []
  if (stringCart) initCart = JSON.parse(stringCart)
  const [StateCart, setStateCart] = React.useState<Array<cartShape>>(initCart)
  const [cartEmpty, setCartEmpty] = React.useState(!stringCart)
  const handleCancelPage = () => {
    navigate('/')
  }
  const handleQuantityChange = (dropdownQuantity: number, cartIndex: number) => {
    const localCart: Array<cartShape> = [...StateCart]
    localCart[cartIndex].cartQuantity = dropdownQuantity
    const currItemPrice = localCart[cartIndex].itemFinalPrice
    localCart[cartIndex].cartPrice = currItemPrice * dropdownQuantity
    localStorage.setItem('cart', JSON.stringify(localCart))
    setStateCart(localCart)
  }
  const deleteFromCart = (removeIndex: number, e: any) => {
    const localCart: Array<cartShape> = [...StateCart]
    localCart.splice(removeIndex, 1)
    localStorage.setItem('cart', JSON.stringify(localCart))
    setStateCart(localCart)
    if (localCart.length === 0) setCartEmpty(true)
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
          <div className="cart-item-section">
            {StateCart.map((cartItem, index) => (
              <div key={index.toString()} className="cart-item-row">
                <QuantityDropdown cartIndex={index} cartQuantity={cartItem.cartQuantity} handleQuantityChange={handleQuantityChange} />
                <CartItemDetails cartItem={cartItem} />
                <div className="cart-item-price">
                  {`Rs ${cartItem.cartPrice}`}
                </div>
                <div className="remove-cart-item">
                  <DeleteForeverRoundedIcon onClick={(e) => deleteFromCart(index, e)} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
