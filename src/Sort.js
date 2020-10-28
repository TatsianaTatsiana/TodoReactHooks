import React, { useState } from 'react';

export const Sort = ({ sortItem }) => {
  const [sort, setSort] = useState('no');

  const saveSortValue = (e) => {
    setSort(e.target.value);
    sortItem(e.target.value)
  }

  return (
    <form className="sort">
      <select onChange={saveSortValue} className="select">
        <option value="no">Without sort</option>
        <option value="az">From A to Z</option>
        <option value="za">From Z to A</option>
      </select>
    </form>
  )
}