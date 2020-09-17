/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { navigate } from '@reach/router'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import AddItemButton from '../add-item-button/index'
import './index.css'

interface AddItemProps {
  itemId: string;
}

const QuantityInput = (props: AddItemProps) => {
  const {
    itemId,
  } = props
  const [Quantity, setQuantity] = React.useState(1)
  let localCart: any = localStorage.getItem('cart')
  const handleSubtractClick = () => {
    let currQuantity = Quantity
    if (currQuantity > 1) {
      currQuantity -= 1
    }
    setQuantity(currQuantity)
  }
  const handleAddClick = () => {
    let currQuantity = Quantity
    currQuantity += 1
    setQuantity(currQuantity)
  }
  const handleAddItemClick = () => {
    localCart = JSON.parse(localCart)
    const newItem: any = { id: itemId, quantity: Quantity }
    if (localCart) {
      localCart.push(newItem)
    } else {
      localCart = [newItem]
    }
    const stringCart = JSON.stringify(localCart)
    localStorage.setItem('cart', stringCart)
    navigate('/')
  }
  return (
    <>
      <div className="quality-input-group">
        <div className="subtract-button" role="button" tabIndex={0} onClick={handleSubtractClick}>
          <RemoveCircleOutlineRoundedIcon fontSize="large" />
        </div>
        <span>
          {Quantity}
        </span>
        <div className="add-button" role="button" tabIndex={0} onClick={handleAddClick}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </div>
      </div>
      <div className="bottom-sticky-button" role="button" tabIndex={0} onClick={handleAddItemClick}>
        <AddItemButton />
      </div>
    </>
  )
}

export default QuantityInput
