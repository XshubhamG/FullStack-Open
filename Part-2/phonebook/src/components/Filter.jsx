import React from 'react'

const Filter = ({ filterVal, setFilterVal }) => {
  return (
    <div>
      filter shown with <input value={filterVal} onChange={e => setFilterVal(e.target.value)} />
    </div>
  )
}

export default Filter
