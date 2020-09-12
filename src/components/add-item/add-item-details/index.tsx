import React from 'react'
import './index.css'
import ItemDetails from '../../menu/menu-card/items'

export default function AddItemDetails() {
  interface IItem {
    name: string;
    desc: string;
    price: any;
    image: string;
  }
  const item: IItem = ItemDetails.Regular[0]
  return (
    <div className="item-top-section">
      <div className="item-top-image">
        <img src={item.image} alt="item-picha" />
      </div>
      <h2>{ item.name }</h2>
      <p>{ item.desc }</p>
    </div>
  )
}
