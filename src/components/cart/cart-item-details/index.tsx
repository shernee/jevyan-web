import React from 'react'
import { cartShape } from '../../../data/type'
import './index.css'

interface CartDetailsProps {
  cartItem: cartShape;
  currency: string;
}

const CartItemDetails = (props: CartDetailsProps) => {
  const {
    cartItem, currency,
  } = props
  const {
    itemName, itemChoices,
  } = cartItem
  return (
    <div className="cart-item-text">
      <div className="cart-item-name">
        {itemName}
      </div>
      {itemChoices.map((choice, index) => (
        <div key={index.toString()} className="cart-choices">
          <div className="cart-group-name">
            {`${choice.groupName} (${currency} ${choice.choicePrice})`}
          </div>
          <div className="cart-choice-name">
            {choice.choiceName.join(',')}
          </div>
        </div>
      ))}
    </div>
  )
}
export default CartItemDetails
