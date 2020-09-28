import React from 'react'
import { navigate } from '@reach/router'
import { itemShape, bannerShape } from '../../../data/type'
import {
  bannerFromStorage,
} from '../../../helper/helper'
import './index.css'

interface ICardProps {
  item : itemShape;
}

const ItemCard = (props: ICardProps) => {
  const {
    item,
  } = props
  const localBanner: bannerShape = bannerFromStorage()
  const handleItemAdd = () => {
    navigate(`/add-item/${item.id}`)
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="item-card" role="button" tabIndex={0} onClick={handleItemAdd}>
      <div className="item-card-text">
        <h6 className="item-name">
          {item.name}
        </h6>
        <p className="item-desc">
          {item.description}
        </p>
        <p className="item-price">
          {(item.price) && (
            `${localBanner.currency} ${item.price}`
          )}
          {(item.unit) && (
            ` / ${item.unit}`
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
