import React from 'react'
import { NativeSelect } from '@material-ui/core'
import './index.css'

interface TableHeaderProps {
  tableList: Array<string>;
  selectedTable: string;
  handleTableChange: Function;
}

const TableHeader = (props: TableHeaderProps) => {
  const {
    tableList, selectedTable, handleTableChange,
  } = props

  const [TableNo, setTableNo] = React.useState(selectedTable)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTableNo = event.currentTarget.value
    handleTableChange(newTableNo)
    setTableNo(newTableNo)
  }
  return (
    <div className="dropdown-header">
      <div className="dropdown-label">
        Table Number
      </div>
      <NativeSelect
        value={TableNo}
        name="table"
        onChange={handleSelectChange}
        inputProps={{
          style: { textAlign: 'center' },
        }}
      >
        <option value="" disabled>
          {TableNo}
        </option>
        {tableList.map((table, tableIndex) => (
          <option key={tableIndex.toString()} value={table}>{table}</option>
        ))}
      </NativeSelect>
    </div>
  )
}

export default TableHeader
