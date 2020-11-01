/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { RouteComponentProps, navigate, useParams } from '@reach/router'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import AddItemDetails from '../../components/add-item/add-item-details/index'
import ItemChoices from '../../components/add-item/item-choices/index'
import QuantityInput from '../../components/add-item/quantity-input/index'
import AddItemButton from '../../components/add-item/add-item-button/index'
import {
  itemShape, groupShape, choiceShape, IlocalChoices, IChoiceHash, cartShape,
} from '../../data/type'
import {
  itemFromStorage, cartFromStorage, cartToStorage,
} from '../../helper/helper'
import './index.css'
/*
const buttonEnable = (newObj: IlocalChoice, ChoiceGroups: Array<groupShape>) => {
  const selGroup = ChoiceGroups.filter((group) => group.id === newObj.groupId)
  selGroup.
}
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddItem(props: RouteComponentProps) {
  const params = useParams()
  const selectedId = params['item-id']
  const [Loading, setLoading] = React.useState<boolean>(true)
  const [ChoiceGroups, setChoiceGroups] = React.useState<Array<groupShape>>([])
  const [Choices, setChoices] = React.useState<Array<choiceShape>>([])
  const [Quantity, setQuantity] = React.useState(1)
  const [SelectedChoices, setSelectedChoices] = React.useState<IlocalChoices>([])
  const [ChoiceHash, setChoiceHash] = React.useState<IChoiceHash>({})
  const [Enable, setEnable] = React.useState<boolean>(false)

  React.useEffect(() => {
    const choicesUrl = `${window.location.origin}/api/menu/choices/${selectedId}/`
    const loadData = async () => {
      const choicesResponse = await axios.get(choicesUrl)
      setChoiceGroups(choicesResponse.data.groups)
      const initSelectedChoices: IlocalChoices = choicesResponse.data.groups.map((group: groupShape) => {
        const newInit = {
          groupId: group.id,
          groupName: group.name,
          choiceId: [],
          choiceName: [],
          choicePrice: 0,
          min: group.min_allowed,
          max: group.max_allowed,
          valid: !group.min_allowed,
        }
        return newInit
      })
      const initHash: IChoiceHash = {}
      initSelectedChoices.forEach((group) => {
        initHash[group.groupId] = initSelectedChoices.indexOf(group)
      })
      setSelectedChoices(initSelectedChoices)
      setChoiceHash(initHash)
      setEnable(initSelectedChoices.every((curr) => curr.valid))
      setChoices(choicesResponse.data.choices)
      setLoading(false)
    }
    loadData()
  }, [selectedId])

  const localItems: Array<itemShape> = itemFromStorage()
  const item: itemShape = Object.values(localItems).find((i) => i.id === parseInt(selectedId, 10)) || {
    id: 0,
    name: '',
    description: '',
    price: '',
    unit: '',
    image: '',
    category: 0,
  }
  const itemPrice: number = parseInt(item.price, 10)
  const [Price, setPrice] = React.useState<number>(itemPrice)
  const [CartPrice, setCartPrice] = React.useState<number>(Price)

  const localCart = cartFromStorage()

  const handleCancelPage = () => {
    navigate('/')
  }

  const handleChoicePrice = (newObj: any, existingIndex: number) => {
    const localChoices: IlocalChoices = [...SelectedChoices]
    const existingObj = localChoices[existingIndex]
    const { choice_type } = ChoiceGroups[ChoiceHash[newObj.groupId]]
    if (choice_type === 2) {
      if (newObj.checked) {
        const ind: number = existingObj.choiceId.indexOf(newObj.choiceId)
        existingObj.choiceId.splice(ind, 1)
        existingObj.choiceName.splice(ind, 1)
        existingObj.choicePrice -= newObj.choicePrice
        existingObj.valid = newObj.valid
      } else {
        existingObj.choiceId.push(newObj.choiceId)
        existingObj.choiceName.push(newObj.choiceName)
        existingObj.choicePrice += newObj.choicePrice
        existingObj.valid = newObj.valid
      }
    } else {
      if (existingObj.choiceId.length > 0) {
        existingObj.choiceId.splice(0, 1, newObj.choiceId)
        existingObj.choiceName.splice(0, 1, newObj.choiceName)
      } else {
        existingObj.choiceId.push(newObj.choiceId)
        existingObj.choiceName.push(newObj.choiceName)
      }
      existingObj.choicePrice = newObj.choicePrice
      existingObj.valid = newObj.valid
    }
    localChoices.splice(existingIndex, 1, existingObj)
    const totalChoicePrice: number = localChoices.reduce((total, group) => group.choicePrice + total, 0)
    const itemChoicePrice = itemPrice + totalChoicePrice
    setSelectedChoices(localChoices)
    setEnable(localChoices.every((curr) => curr.valid))
    setPrice(itemChoicePrice)
    setCartPrice(itemChoicePrice * Quantity)
  }
  const handleItemQuantity = (newQuantity: number) => {
    setQuantity(newQuantity)
    setCartPrice(Price * newQuantity)
  }
  const handleAddItemClick = () => {
    const newCartItem: cartShape = {
      itemId: parseInt(selectedId, 10),
      itemName: item.name,
      itemChoices: SelectedChoices,
      itemFinalPrice: Price,
      cartQuantity: Quantity,
      cartPrice: CartPrice,
    }
    localCart.push(newCartItem)
    cartToStorage(localCart)
    navigate('/')
  }

  return (
    <div className="container-fluid px-0">
      {
        Loading
          ? null
          : (
            <>
              <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
                <CancelOutlinedIcon fontSize="large" />
              </div>
              <div className="add-item-column">
                <AddItemDetails
                  item={item}
                />
                {(SelectedChoices.length > 0)
                  ? (
                    <ItemChoices
                      choiceGroups={ChoiceGroups}
                      choices={Choices}
                      choiceHash={ChoiceHash}
                      handleChoicePrice={handleChoicePrice}
                      selectedChoices={SelectedChoices}
                    />
                  )
                  : null}
                <QuantityInput
                  quantity={Quantity}
                  handleItemQuantity={handleItemQuantity}
                />
                <div className="add-item-bottom-sticky-button">
                  <AddItemButton
                    cartQuantity={Quantity}
                    cartPrice={CartPrice}
                    enable={Enable}
                    handleAddItem={handleAddItemClick}
                  />
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

