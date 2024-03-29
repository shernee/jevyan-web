/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {
  FormControl,
  NativeSelect,
} from '@material-ui/core/'
import './index.css'

interface DropdownProps {
  cartIndex: number;
  cartQuantity: number;
  handleQuantityChange: Function;
}

const QuantityDropdown = (props: DropdownProps) => {
  const {
    cartIndex, cartQuantity, handleQuantityChange,
  } = props
  const [Qty, setQty] = React.useState<number>(cartQuantity)
  const numList: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity: number = parseInt(event.currentTarget.value, 10)
    handleQuantityChange(newQuantity, cartIndex)
    setQty(newQuantity)
  }

  return (
    <div className="cart-quantity-dropdown">
      <FormControl>
        <NativeSelect
          value={Qty}
          name="quantity"
          onChange={handleSelectChange}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        >
          <option value="" disabled>
            {Qty}
          </option>
          {numList.map((numQuantity, numIndex) => (
            <option key={numIndex.toString()} value={numQuantity}>{numQuantity}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  )
}
export default QuantityDropdown

