/* eslint-disable no-console */
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { NativeSelect } from '@material-ui/core'
import './index.css'

interface DeliveryModalProps {
  dayList: Array<string>;
  timeList: Array<string>;
  handleModalChange: Function;
  show: boolean;
}

const DeliveryPickModal = (props: DeliveryModalProps) => {
  const {
    dayList, timeList, handleModalChange, show,
  } = props

  const [ShowModal, setShowModal] = React.useState(show)
  const [ModalDay, setModalDay] = React.useState('')
  const [ModalTime, setModalTime] = React.useState('')

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = event.currentTarget.value
    setModalDay(newDay)
  }
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = event.currentTarget.value
    setModalTime(newTime)
  }
  const handleConfirm = () => {
    setShowModal(!ModalDay || !ModalTime)
    handleModalChange(ModalDay, ModalTime)
  }
  return (
    <Modal show={ShowModal} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Please select a Delivery time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-day-dropdown">
          <NativeSelect
            value={ModalDay}
            name="day"
            onChange={handleDayChange}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          >
            <option value="" disabled>
              {ModalDay}
            </option>
            {dayList.map((day, dayIndex) => (
              <option key={dayIndex.toString()} value={day}>{day}</option>
            ))}
          </NativeSelect>
        </div>
        <div className="modal-time-dropdown">
          <NativeSelect
            value={ModalTime}
            name="time"
            onChange={handleTimeChange}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          >
            <option value="" disabled>
              {ModalTime}
            </option>
            {timeList.map((time, timeIndex) => (
              <option key={timeIndex.toString()} value={time}>{time}</option>
            ))}
          </NativeSelect>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeliveryPickModal
