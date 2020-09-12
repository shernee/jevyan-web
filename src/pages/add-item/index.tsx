import React from 'react'
import './index.css'
import AddItemDetails from '../../components/add-item/add-item-details/index'
import QuantityInput from '../../components/add-item/quantity-plus-minus/index'

export default function AddItem() {
  return (
    <div className="container-fluid px-0">
      <div className="add-item-column">
        <AddItemDetails />
        <QuantityInput />
      </div>
    </div>
  )
}
