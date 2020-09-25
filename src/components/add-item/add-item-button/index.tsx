/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './index.css'

interface AddItemButtonProps {
  cartQuantity: number;
  cartPrice: number;
}

const AddItemButton = (props: AddItemButtonProps) => {
  const {
    cartQuantity, cartPrice,
  } = props
  return (
    <button type="button" className="btn btn-dark rounded-0">
      <div className="add-item-button-quantity">
        {cartQuantity}
      </div>
      <div className="add-item-label">
        Add Item to Order
      </div>
      <div className="add-item-button-price">
        {`Rs ${cartPrice}`}
      </div>
    </button>
  )
}

export default AddItemButton
