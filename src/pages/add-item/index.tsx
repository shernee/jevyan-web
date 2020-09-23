/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import axios from 'axios'
import { RouteComponentProps, navigate, useParams } from '@reach/router'
import './index.css'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import AddItemDetails from '../../components/add-item/add-item-details/index'
import QuantityInput from '../../components/add-item/quantity-plus-minus/index'
import ItemChoices from '../../components/add-item/item-choices-section/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddItem(props: RouteComponentProps) {
  const params = useParams()
  const selectedId = params['item-id']
  const [ChoiceGroups, setChoiceGroups] = React.useState([])
  const [Choices, setChoices] = React.useState([])
  const stringItems = localStorage.getItem('items')
  let Items = []
  if (stringItems) {
    Items = JSON.parse(stringItems)
  }
  React.useEffect(() => {
    const choicesUrl = `${window.location.origin}/api/menu/choices/${selectedId}/`
    const loadData = async () => {
      const choicesResponse = await axios.get(choicesUrl)
      setChoiceGroups(choicesResponse.data.groups)
      setChoices(choicesResponse.data.choices)
    }
    loadData()
  }, [selectedId])
  const handleCancelPage = () => {
    navigate('/')
  }
  return (
    <div className="container-fluid px-0">
      <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
        <CancelOutlinedIcon fontSize="large" />
      </div>
      <div className="add-item-column">
        <AddItemDetails
          itemId={params['item-id']}
          items={Items}
        />
        <ItemChoices choiceGroups={ChoiceGroups} choices={Choices} />
        <QuantityInput
          itemId={params['item-id']}
          items={Items}
        />
      </div>
    </div>
  )
}

