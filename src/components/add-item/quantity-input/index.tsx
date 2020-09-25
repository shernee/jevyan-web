/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import './index.css'

interface QuantityInputProps {
  quantity: number;
  handleItemQuantity: Function;
}

const QuantityInput = (props: QuantityInputProps) => {
  const {
    quantity, handleItemQuantity,
  } = props
  const [QuantityCount, setQuantityCount] = React.useState(1)

  const handleSubtractClick = () => {
    let currQCount = QuantityCount
    if (currQCount > 1) currQCount -= 1
    setQuantityCount(currQCount)
    handleItemQuantity(quantity - 1)
  }
  const handleAddClick = () => {
    let currQCount = QuantityCount
    currQCount += 1
    setQuantityCount(currQCount)
    handleItemQuantity(quantity + 1)
  }

  return (
    <div className="quantity-input-group">
      <div className="subtract-button" role="button" tabIndex={0} onClick={handleSubtractClick}>
        <RemoveCircleOutlineRoundedIcon fontSize="large" />
      </div>
      <span>
        {QuantityCount}
      </span>
      <div className="add-button" role="button" tabIndex={0} onClick={handleAddClick}>
        <AddCircleOutlineRoundedIcon fontSize="large" />
      </div>
    </div>
  )
}
export default QuantityInput
