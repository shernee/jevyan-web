/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { navigate } from '@reach/router'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import AddItemButton from '../add-item-button/index'
import { itemShape, cartShape } from '../../../data/type'
import './index.css'

interface AddItemProps {
  itemId: string;
  items: Array<itemShape>;
}

const QuantityInput = (props: AddItemProps) => {
  const {
    itemId, items,
  } = props

  const item: any = Object.values(items).find((i) => i.id === parseInt(itemId, 10))
  const itemPrice = parseInt(item.price, 10)

  const [Quantity, setQuantity] = React.useState(1)
  const [Price, setPrice] = React.useState(itemPrice)

  let localCart: any = localStorage.getItem('cart')

  const handleSubtractClick = () => {
    let currQuantity = Quantity
    if (currQuantity > 1) {
      currQuantity -= 1
    }
    setQuantity(currQuantity)
    setPrice(itemPrice * currQuantity)
  }
  const handleAddClick = () => {
    let currQuantity = Quantity
    currQuantity += 1
    setQuantity(currQuantity)
    setPrice(itemPrice * currQuantity)
  }
  const handleAddItemClick = () => {
    localCart = JSON.parse(localCart)
    const newItem: cartShape = {}
    newItem[itemId] = { cartQuantity: Quantity, cartPrice: Price }
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
        <AddItemButton quantity={Quantity} totalPrice={Price} />
      </div>
    </>
  )
}

export default QuantityInput
