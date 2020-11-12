/* eslint-disable no-console */
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { NativeSelect } from '@material-ui/core'
import './index.css'

interface TableModalProps {
  tableList: Array<string>;
  handleModalChange: Function;
  show: boolean;
}

const TablePickModal = (props: TableModalProps) => {
  const {
    tableList, handleModalChange, show,
  } = props

  const [ShowModal, setShowModal] = React.useState(show)
  const [ModalTable, setModalTable] = React.useState('')

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTable = event.currentTarget.value
    handleModalChange(newTable)
    setModalTable(newTable)
  }

  const handleConfirm = () => {
    setShowModal(!ModalTable)
    window.location.reload()
  }
  return (
    <Modal show={ShowModal} backdrop="static" keyboard={false} animation={false}>
      <Modal.Header>
        <Modal.Title>Please select your table number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-day-dropdown">
          <NativeSelect
            value={ModalTable}
            name="table"
            onChange={handleTableChange}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          >
            <option value="" disabled>
              {ModalTable}
            </option>
            {tableList.map((table, tableIndex) => (
              <option key={tableIndex.toString()} value={table}>{table}</option>
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

export default TablePickModal
