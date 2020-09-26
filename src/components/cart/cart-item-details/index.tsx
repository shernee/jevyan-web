import React from 'react'
import { cartShape } from '../../../data/type'
import './index.css'

interface CartDetailsProps {
  cartItem: cartShape;
}

const CartItemDetails = (props: CartDetailsProps) => {
  const {
    cartItem,
  } = props
  const {
    itemName, itemChoices,
  } = cartItem
  const currency = '₹'
  return (
    <div className="cart-item-text">
      <div>
        {itemName}
      </div>
      {itemChoices.map((choice) => (
        <div>
          <div>
            {`${choice.groupName} (${currency} ${choice.choicePrice})`}
          </div>
          <div>
            {choice.choiceName}
          </div>
        </div>
      ))}
    </div>
  )
}
export default CartItemDetails
