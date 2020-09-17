/* eslint-disable no-console */
import React from 'react'
import ItemDetails from '../../menu/menu-card/items'
import './index.css'

interface CartItemProps {
  cartItem : {
    id: string;
    quantity: number;
  }
}

const CartItem = (props: CartItemProps) => {
  const {
    cartItem,
  } = props
  const { id, quantity } = cartItem
  const catId: number = parseInt(id.split('-')[0], 10)
  const clickedId: string = id.split('-')[1]
  const item: any = Object.values(ItemDetails)[catId].find((i) => i.id === clickedId)

  return (
    <div className="cart-item-section">
      <div className="quantity-dropdown">
        <h3>
          {quantity}
        </h3>
      </div>
      <div className="cart-item-name">
        <h3>
          {item.name}
        </h3>
      </div>
      <div className="cart-item-pie">
        <h3>
          {item.price * quantity}
        </h3>
      </div>
    </div>
  )
}

export default CartItem
