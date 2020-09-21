/* eslint-disable no-console */
import React from 'react'
import ItemDetails from '../../menu/menu-card/items'
import './index.css'

interface CartItemProps {
  cartItem : {
    id: string;
    quantity: number;
    totalPrice: number;
  }
}

const CartItem = (props: CartItemProps) => {
  const {
    cartItem,
  } = props
  const { id, quantity, totalPrice } = cartItem
  const catId: number = parseInt(id.split('-')[0], 10)
  const clickedId: string = id.split('-')[1]
  const item: any = Object.values(ItemDetails)[catId].find((i) => i.id === clickedId)

  return (
    <div className="cart-item-section">
      <div className="quantity-dropdown">
        {quantity}
      </div>
      <div className="cart-item-name">
        <h6>
          {item.name}
        </h6>
      </div>
      <div className="cart-item-price">
        {`Rs ${totalPrice}`}
      </div>
    </div>
  )
}

export default CartItem
