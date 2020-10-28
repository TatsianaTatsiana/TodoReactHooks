import React from 'react';

export const FilterStatus = ({ filterStatusChange }) => {

  return (
    <select className="select" onChange={(e) => { filterStatusChange(e.target.value) }}>
      <option value="all">All</option>
      <option value="done">Done</option>
      <option value="not done">Not done</option>
    </select>
  )
}