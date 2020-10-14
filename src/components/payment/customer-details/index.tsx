/* eslint-disable no-console */
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import { formShape } from '../../../data/type'
import './index.css'

interface CustomerDetailProps {
  formValues: formShape;
  saveCustomer: Function;
}

const CustomerDetails = (props: CustomerDetailProps) => {
  const {
    formValues, saveCustomer,
  } = props
  const formik = useFormik({
    initialValues: {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      street: formValues.street,
      landmark: formValues.landmark,
      neighborhood: formValues.neighborhood,
      city: formValues.city,
      state: formValues.state,
      day: formValues.day,
      time: formValues.time,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(32, '32 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(32, '32 characters or less')
        .required('Required'),
      email: Yup.string()
        .email()
        .max(64, '64 characters or less')
        .required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be a 10 digit number')
        .max(10, '10 digits or less')
        .required('Required'),
      street: Yup.string()
        .max(64, '64 characters or less')
        .required('Required'),
      landmark: Yup.string()
        .max(64, '64 characters or less'),
      neighborhood: Yup.string()
        .max(32, '32 characters or less')
        .required('Required'),
      city: Yup.string()
        .max(32, '32 characters or less')
        .required('Required'),
      state: Yup.string()
        .max(32, '32 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2))
      saveCustomer(values)
    },
  })

  return (
    <div className="customer-details-section">
      <div className="details-header">
        <h4>
          Delivery Details
        </h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="detail-fields detail-name">
          <TextField
            name="firstName"
            id="firstName"
            label="First name"
            placeholder=""
            multiline
            type="text"
            variant="outlined"
            helperText={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : ''}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="lastName"
            id="lastName"
            label="Last Name"
            placeholder=""
            multiline
            type="text"
            variant="outlined"
            helperText={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : ''}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="detail-fields detail-email-phone">
          <TextField
            name="email"
            id="email"
            label="Email address"
            placeholder=""
            multiline
            type="string"
            variant="outlined"
            value={formik.values.email}
            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="phone"
            id="phone"
            label="Contact number"
            placeholder="10 digit contact number"
            multiline
            type="text"
            variant="outlined"
            helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="detail-fields detail-address-firstline">
          <TextField
            name="street"
            id="street"
            label="Street"
            placeholder=""
            multiline
            type="string"
            variant="outlined"
            helperText={formik.errors.street && formik.touched.street ? formik.errors.street : ''}
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="landmark"
            id="landmark"
            label="Landmark (optional)"
            placeholder="Ex: Behind Big bazaar"
            multiline
            type="string"
            variant="outlined"
            helperText={formik.errors.landmark && formik.touched.landmark ? formik.errors.landmark : ''}
            value={formik.values.landmark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="detail-fields detail-address-secondline">
          <TextField
            name="neighborhood"
            id="neighborhood"
            label="Neighborhood"
            placeholder="Ex: Koramangala"
            multiline
            type="string"
            variant="outlined"
            helperText={formik.errors.neighborhood && formik.touched.neighborhood ? formik.errors.neighborhood : ''}
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="city"
            id="city"
            label="City"
            placeholder=""
            multiline
            type="string"
            variant="outlined"
            helperText={formik.errors.city && formik.touched.city ? formik.errors.city : ''}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="state"
            id="state"
            label="State"
            placeholder=""
            multiline
            type="string"
            variant="outlined"
            helperText={formik.errors.state && formik.touched.state ? formik.errors.state : ''}
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="detail-fields detail-delivery-time">
          <TextField
            name="day"
            id="day"
            label="Delivery day"
            placeholder=""
            multiline
            type="string"
            inputProps={{
              readOnly: true,
            }}
            variant="outlined"
            value={formik.values.day}
          />
          <TextField
            name="time"
            id="time"
            label="Delivery time"
            placeholder=""
            multiline
            type="string"
            inputProps={{
              readOnly: true,
            }}
            variant="outlined"
            value={formik.values.time}
          />
        </div>
        <div className="detail-submit">
          <button type="submit" className="btn btn-dark rounded-0">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  )
}
export default CustomerDetails
