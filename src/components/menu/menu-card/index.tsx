import React from 'react'
import './index.css'
import { categoryShape, itemShape } from '../../../data/type'
import ItemCard from '../item-card/index'

interface IMenuProps {
  categories: Array<categoryShape>;
  items: Array<itemShape>;
}

export default function MenuCard(props: IMenuProps) {
  const {
    categories, items,
  } = props

  return (
    <section id="menu-card">
      <div className="menu-card-container">
        {categories.map((category) => (
          <div id={category.name} key={category.id} className="category-rows">
            <h4 className="category-header">
              {category.name}
            </h4>
            <div className="item-card-box">
              {items.filter((item) => (
                item.category === category.id)).map((item) => (
                  <ItemCard
                    key={item.id}
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
