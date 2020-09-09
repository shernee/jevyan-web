import React from 'react'
import './index.css'

export default function MenuCard() {
  const items: { [category:string]: Array<string> } = {}
  items.Regular = ['Chicken Cutlets', 'Meat Pepper Sukka', 'Pork Chilly/Bafat', 'Sanna']
  items.Specials = ['Patholyo', 'Mackerel Fry']

  return (
    <section id="menu-card">
      <div className="container">
        {Object.keys(items).map((category, catIndex) => (
          <div id={category} className="category-rows" key={catIndex.toString()}>
            <h4>{category}</h4>
            <div className="item-card-box">
              {items[category].map((item, itemIndex) => (
                <div className="item-card" key={itemIndex.toString()}>
                  <div className="item-details">
                    <h6>{item}</h6>
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
