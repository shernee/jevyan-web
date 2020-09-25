import React from 'react'
import './index.css'
import { itemShape } from '../../../data/type'

interface AddItemProps {
  item: itemShape;
}

const AddItemDetails = (props: AddItemProps) => {
  const {
    item,
  } = props

  return (
    <div className="item-top-section">
      {item.image && (
        <div className="item-top-image">
          <img src={item.image} alt="item-picha" />
        </div>
      )}
      <div className="item-top-details">
        <h2>{ item.name }</h2>
        <p>{ item.description }</p>
      </div>
    </div>
  )
}

export default AddItemDetails

