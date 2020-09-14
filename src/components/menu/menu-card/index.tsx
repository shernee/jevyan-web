import React from 'react'
import './index.css'
import ItemDetails from './items.js'
import ItemCard from '../item-card/index'

export default function MenuCard() {
  interface IItem {
    id: number;
    name: string;
    desc: string;
    price: string;
    image?: string
  }

  const items: { [categoryName:string]: Array<IItem> } = ItemDetails
  const categories: Array<string> = Object.keys(ItemDetails)
  return (
    <section id="menu-card">
      <div className="menu-card-container">
        {categories.map((category, catIndex) => (
          <div id={category} className="category-rows" key={catIndex.toString()}>
            <h4 className="category-header">
              {category}
            </h4>
            <div className="item-card-box">
              {items[category].map((item, itemIndex) => (
                <ItemCard
                  key={itemIndex.toString()}
                  item={item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
