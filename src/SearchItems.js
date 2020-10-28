import React, { useState } from 'react';

export const SearchItems = ({ searchItems }) => {
  const [search, setSearch] = useState('');

  const saveSearch = (e) => {
    setSearch(e.target.value)
    searchItems(e.target.value)
  }

  return (
    <input className="input" type="text" name='title'
      placeholder="Search"
      value={search}
      autoComplete='off'
      onChange={saveSearch} />
  )
}