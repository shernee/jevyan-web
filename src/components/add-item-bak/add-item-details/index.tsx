/* eslint-disable no-console */
import React from 'react'
import './index.css'
import { itemShape } from '../../../data/type'

interface AddItemProps {
  itemId: string;
  items: Array<itemShape>;
}

const AddItemDetails = (props: AddItemProps) => {
  const {
    itemId, items,
  } = props

  const item: any = Object.values(items).find((i) => i.id === parseInt(itemId, 10))

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

