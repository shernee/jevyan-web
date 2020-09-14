import React from 'react'
import './index.css'
import ItemDetails from '../../menu/menu-card/items'

const AddItemDetails = () => {
  interface IItem {
    id: number,
    name: string,
    desc: string,
    price: string,
    image: string,
  }

  const item: IItem = ItemDetails['Baked Mains'][0]
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

export default AddItemDetails
