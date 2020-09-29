/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { bannerShape } from '../../../data/type'
import {
  bannerFromStorage,
} from '../../../helper/helper'
import './index.css'

interface AddItemButtonProps {
  cartQuantity: number;
  cartPrice: number;
  enable: boolean;
  handleAddItem: Function;
}

const AddItemButton = (props: AddItemButtonProps) => {
  const {
    cartQuantity, cartPrice, enable, handleAddItem,
  } = props
  const localBanner: bannerShape = bannerFromStorage()

  const handleClick = () => {
    handleAddItem()
  }

  return (
    <button type="button" className="btn btn-dark rounded-0" disabled={!enable} onClick={handleClick}>
      <div className="add-item-button-quantity">
        {cartQuantity}
      </div>
      <div className="add-item-label">
        Add Item to Order
      </div>
      <div className="add-item-button-price">
        {`${localBanner.currency} ${cartPrice}`}
      </div>
    </button>
  )
}

export default AddItemButton
