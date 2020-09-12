/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import './index.css'

export default function QuantityInput() {
  const [Quantity, setQuantity] = React.useState(1)
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
  return (
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
  )
}
