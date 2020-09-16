/* eslint-disable no-console */
import React from 'react'
import './index.css'
import ItemDetails from '../../menu/menu-card/items'

interface AddItemProps {
  itemId: string;
}

const AddItemDetails = (props: AddItemProps) => {
  const {
    itemId,
  } = props

  const catId: number = parseInt(itemId.split('-')[0], 10)
  const clickedId: string = itemId.split('-')[1]
  const item: any = Object.values(ItemDetails)[catId].find((i) => i.id === clickedId)

  return (
    <div className="item-top-section">
      {item.image && (
        <div className="item-top-image">
          <img src={item.image} alt="item-picha" />
        </div>
      )}
      <div className="item-top-details">
        <h2>{ item.name }</h2>
        <p>{ item.desc }</p>
      </div>
    </div>
  )
}

export default AddItemDetails

