import React from 'react'
import './index.css'
import ItemDetails from './items.js'

export default function MenuCard() {
  interface IItem {
    name: string, desc: string, price: string, image?: string
  }

  const items: { [categoryName:string]: Array<IItem> } = ItemDetails
  const categories: Array<string> = Object.keys(ItemDetails)

  return (
    <section id="menu-card">
      <div className="container-fluid">
        {categories.map((category, catIndex) => (
          <div id={category} className="category-rows" key={catIndex.toString()}>
            <h4 className="category-header">
              {category}
            </h4>
            <div className="item-card-box">
              {items[category].map((item, itemIndex) => (
                <div className="item-card" key={itemIndex.toString()}>
                  <div className="item-card-text">
                    <h6 className="item-name">
                      {item.name}
                    </h6>
                    <p className="item-desc">
                      {item.desc}
                    </p>
                    <p className="item-price">
                      {item.price}
                    </p>
                  </div>
                  <div className="item-image">
                    <img src={item.image} alt={item.image} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
