/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CartItem from '../../components/cart/cart-item/index'
import './index.css'

interface ICart {
  id: string;
  quantity: number;
  totalPrice: number;
}

export default function Cart(props: RouteComponentProps) {
  const stringCart: any = localStorage.getItem('cart')
  const localCart: Array<ICart> = JSON.parse(stringCart)
  const [cartEmpty, setCartEmpty] = React.useState(!localCart)
  const handleCancelPage = () => {
    navigate('/')
  }
  const handleClearCart = () => {
    localStorage.removeItem('cart')
    const currCartState = cartEmpty
    setCartEmpty(!currCartState)
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
          <div className="cart-items">
            {localCart.map((cartItem, index) => (
              <CartItem cartItem={cartItem} key={index.toString()} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
