/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { RouteComponentProps, navigate, useParams } from '@reach/router'
import './index.css'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import AddItemDetails from '../../components/add-item/add-item-details/index'
import ItemChoices from '../../components/add-item/item-choices/index'
import QuantityInput from '../../components/add-item/quantity-input/index'
import AddItemButton from '../../components/add-item/add-item-button/index'
import {
  itemShape, groupShape, choiceShape, IlocalChoice, IlocalChoices, IChoiceHash, cartShape,
} from '../../data/type'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddItem(props: RouteComponentProps) {
  const params = useParams()
  const selectedId = params['item-id']
  const [Loading, setLoading] = React.useState<boolean>(true)
  const [ChoiceGroups, setChoiceGroups] = React.useState<Array<groupShape>>([])
  const [Choices, setChoices] = React.useState<Array<choiceShape>>([])
  const [Quantity, setQuantity] = React.useState(1)

  React.useEffect(() => {
    const choicesUrl = `${window.location.origin}/api/menu/choices/${selectedId}/`
    const loadData = async () => {
      const choicesResponse = await axios.get(choicesUrl)
      setChoiceGroups(choicesResponse.data.groups)
      setChoices(choicesResponse.data.choices)
      setLoading(false)
    }
    loadData()
  }, [selectedId])

  const stringItems: string | null = localStorage.getItem('items')
  let localItems: Array<itemShape> = []
  if (stringItems) localItems = JSON.parse(stringItems)
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

  let initSelectedChoices: IlocalChoices = []
  initSelectedChoices = ChoiceGroups.map((group) => {
    const newInit = { groupId: group.id, choiceId: 0, choicePrice: 0 }
    return newInit
  })
  const ChoiceHash: IChoiceHash = {}
  initSelectedChoices.forEach((group) => {
    ChoiceHash[group.groupId] = initSelectedChoices.indexOf(group)
  })
  console.log(initSelectedChoices, ChoiceHash)
  const [SelectedChoices, setSelectedChoices] = React.useState<IlocalChoices>(initSelectedChoices)
  console.log(SelectedChoices)

  const stringCart: string | null = localStorage.getItem('cart')
  let localCart: Array<cartShape> = []
  if (stringCart) localCart = JSON.parse(stringCart)

  const handleCancelPage = () => {
    navigate('/')
  }

  const handleChoicePrice = (newObj: IlocalChoice, existingIndex: number) => {
    const localChoices: IlocalChoices = [...SelectedChoices]
    localChoices[existingIndex] = newObj
    console.log(localChoices)
    const totalChoicePrice: number = localChoices.reduce((total, group) => group.choicePrice + total, 0)
    const itemChoicePrice = itemPrice + totalChoicePrice
    setSelectedChoices(localChoices)
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
      itemChoices: SelectedChoices,
      itemFinalPrice: Price,
      cartQuantity: Quantity,
      cartPrice: CartPrice,
    }
    localCart.push(newCartItem)
    localStorage.setItem('cart', JSON.stringify(localCart))
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
                <ItemChoices
                  choiceGroups={ChoiceGroups}
                  choices={Choices}
                  choiceHash={ChoiceHash}
                  handleChoicePrice={handleChoicePrice}
                />
                <QuantityInput
                  quantity={Quantity}
                  handleItemQuantity={handleItemQuantity}
                />
                <div className="bottom-sticky-button" role="button" tabIndex={0} onClick={handleAddItemClick}>
                  <AddItemButton cartQuantity={Quantity} cartPrice={CartPrice} />
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

