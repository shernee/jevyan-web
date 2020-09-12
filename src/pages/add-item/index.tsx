import React from 'react'
import './index.css'
import AddItemDetails from '../../components/add-item/add-item-details/index'

export default function AddItem() {
  return (
    <div className="container-fluid px-0">
      <div className="add-item-column">
        <AddItemDetails />
      </div>
    </div>
  )
}
