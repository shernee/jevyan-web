import React from 'react'
import './index.css'

interface CardProps {
  item : {
  id: number;
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
  /*
  const handleItemAdd = () => {
    navigate(`/add-item/${item.id}`)
    import { navigate } from '@reach/router'
  }
  */
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
      {item.image && (
        <div className="item-image">
          <img src={item.image} alt={item.image} />
        </div>
      )}
    </div>
  )
}

export default ItemCard
