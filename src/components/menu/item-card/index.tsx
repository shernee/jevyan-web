import React from 'react'
import { navigate } from '@reach/router'
import './index.css'

interface CardProps {
  item : {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit?: string;
  image?: string;
  }
  catKey: string
}

const ItemCard = (props: CardProps) => {
  const {
    item, catKey,
  } = props
  const handleItemAdd = () => {
    const ids: Array<string> = [catKey, item.id]
    const itemId: string = ids.join('-')
    navigate(`/add-item/${itemId}`)
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
          {(item.price) && (
            `Rs ${item.price}`
          )}
          {(item.unit) && (
            ` /${item.unit}`
          )}
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
