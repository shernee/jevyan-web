import React from 'react'
import TextField from '@material-ui/core/TextField'
import './index.css'

const CustomerDetails = () => {
  const fields = ['name', 'email', 'phone', 'address']
  const labels = ['Name', 'Email address', 'Phone number', 'Address']
  const initValues = ['', '', '', '']
  const initState = fields.map((f, i) => ({
    field: f,
    label: labels[i],
    value: initValues[i],
  }))
  const [Details, setDetails] = React.useState(initState)

  return (
    <div className="customer-details-section">
      <div className="details-header">
        <h5>
          Delivery Details
        </h5>
      </div>
      {Details.map((detail, index) => (
        <div className="detail-input">
          <TextField
            key={index.toString()}
            id="standard-basic"
            label={detail.label}
            placeholder=""
            multiline
            value={detail.value}
          />
        </div>
      ))}
    </div>
  )
}
export default CustomerDetails
