import React from 'react'
import { navigate } from '@reach/router'
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
  const handleItemAdd = () => {
    navigate('/add-item')
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="item-card" role="button" tabIndex={0} onClick={handleItemAdd}>
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
