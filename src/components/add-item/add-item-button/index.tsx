import React from 'react'
import './index.css'

interface ItemButtonProps {
  quantity: number;
  totalPrice: number;
}

const AddItemButton = (props: ItemButtonProps) => {
  const {
    quantity, totalPrice,
  } = props
  return (
    <button type="button" className="btn btn-dark rounded-0">
      <div className="add-item-button-quantity">
        {quantity}
      </div>
      <div className="add-item-label">
        Add Item to Order
      </div>
      <div className="add-item-button-price">
        {`Rs ${totalPrice}`}
      </div>
    </button>
  )
}

export default AddItemButton
