import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'

interface EmailModalProps {
  handleOtpConfirm: Function;
}

const EmailModal = (props: EmailModalProps) => {
  const {
    handleOtpConfirm,
  } = props
  const [IsValid, setIsValid] = React.useState(false)
  const [ShowModal, setShowModal] = React.useState(!IsValid)
  const [Email, setEmail] = React.useState('')
  const [Footer, setFooter] = React.useState('')
  const validate = () => true
  const formik = useFormik({
    initialValues: {
      email: Email,
      otp: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .max(64, '64 characters or less')
        .required('Required'),
      otp: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      if (validate()) {
        setIsValid(true)
        setEmail(values.email)
        setShowModal(false)
        handleOtpConfirm(values.email)
      } else {
        setFooter('Invalid OTP')
      }
    },
  })
  return (
    <Modal show={ShowModal} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>User verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="email"
            id="email"
            label="Email address"
            placeholder="Please enter your email address"
            multiline
            type="text"
            variant="outlined"
            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            name="otp"
            id="otp"
            label="OTP"
            placeholder="Please enter the OTP"
            multiline
            type="text"
            variant="outlined"
            helperText={formik.errors.otp && formik.touched.otp ? formik.errors.otp : ''}
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button type="submit" variant="dark">
            Confirm
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {Footer
          ? (
            <div>
              {Footer}
            </div>
          )
          : null}
      </Modal.Footer>
    </Modal>
  )
}

export default EmailModal
