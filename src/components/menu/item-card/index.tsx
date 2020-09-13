import React from 'react'
import './index.css'

interface CardProps {
  item : {
  name: string;
  desc: string;
  price: string;
  image?: string;
  }
}

const ItemCard = (props: CardProps) => {
  const {
    item,
  } = props
  return (
    <div className="item-card">
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
  )
}

export default ItemCard
