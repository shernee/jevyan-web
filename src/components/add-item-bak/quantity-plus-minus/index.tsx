/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { navigate } from '@reach/router'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import AddItemButton from '../add-item-button/index'
import {
  itemShape, cartShape, IlocalChoices,
} from '../../../data/type'
import './index.css'

interface AddItemProps {
  itemId: string;
  items: Array<itemShape>;
}

const QuantityInput = (props: AddItemProps) => {
  const {
    itemId, items,
  } = props

  let stringCart: string | null = localStorage.getItem('cart')
  let localCart: Array<cartShape> = []
  if (stringCart) localCart = JSON.parse(stringCart)
  const stringChoices: string | null = localStorage.getItem('selectedChoices')
  let localChoices: IlocalChoices = []
  if (stringChoices) localChoices = JSON.parse(stringChoices)

  const item: any = Object.values(items).find((i) => i.id === parseInt(itemId, 10))
  const itemPrice: number = parseInt(item.price, 10)
  const choicePrices: number = localChoices.reduce((total, next) => next.choicePrice + total, 0)
  const basePrice: number = itemPrice + choicePrices

  const [Quantity, setQuantity] = React.useState(1)
  const [Price, setPrice] = React.useState(basePrice)

  const handleSubtractClick = () => {
    let currQuantity = Quantity
    if (currQuantity > 1) {
      currQuantity -= 1
    }
    setQuantity(currQuantity)
    setPrice(basePrice * currQuantity)
  }
  const handleAddClick = () => {
    let currQuantity = Quantity
    currQuantity += 1
    setQuantity(currQuantity)
    setPrice(basePrice * currQuantity)
  }
  const handleAddItemClick = () => {
    console.log(localChoices)
    const newItem: cartShape = {}
    const cartId: string = (localCart.length === 0 ? 1 : localCart.length + 1).toString()
    newItem[cartId] = {
      itemId,
      itemChoices: localChoices,
      basePrice,
      cartQuantity: Quantity,
      cartPrice: Price,
    }
    localCart = [...localCart, newItem]
    stringCart = JSON.stringify(localCart)
    localStorage.setItem('cart', stringCart)
    navigate('/')
  }

  return (
    <>
      <div className="quantity-input-group">
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

/*
<ul className="choice-group-item">
          {choiceGroups.map((group) => (
            <li key={group.id}>
              <div className="choice-group-heading">
                {`Choose your ${group.name}`}
              </div>
              {group.choice_type === 1
                ? (
                  <ul className="choice-list">
                    {choices.filter((c) => c.group === group.id).map((ch) => (
                      <li key={ch.id}>
                        <div className="form-check">
                          <input
                            className="form-check input"
                            id={ch.id.toString()}
                            name={group.id.toString()}
                            type="radio"
                            value={ch.name}
                            checked={!!SelectedChoices.find((i) => i.choice === ch.id)}
                            onChange={onRadioChange}
                          />
                          <label className="form-check-label" htmlFor={ch.id.toString()}>
                            {ch.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
                : null}
            </li>
          ))}
        </ul>
    */
