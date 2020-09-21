/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { RouteComponentProps, navigate, useParams } from '@reach/router'
import './index.css'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import AddItemDetails from '../../components/add-item/add-item-details/index'
import QuantityInput from '../../components/add-item/quantity-plus-minus/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddItem(props: RouteComponentProps) {
  const params = useParams()
  const handleCancelPage = () => {
    navigate('/')
  }
  return (
    <div className="container-fluid px-0">
      <div className="cancel-button" role="button" tabIndex={0} onClick={handleCancelPage}>
        <CancelOutlinedIcon fontSize="large" />
      </div>
      <div className="add-item-column">
        <AddItemDetails itemId={params['item-id']} />
        <QuantityInput itemId={params['item-id']} />
      </div>
    </div>
  )
}

