import React, { useState, useContext } from 'react';
import { Context } from './context';

export const TodoItem = ({ id, title, completed }) => {
  const { toggleTodo, removeTodo } = useContext(Context)

  const cls = ['todo'];

  if (completed) {
    cls.push('completed')
  }
  return (
    <div className="item-wrapper">
      <li className={cls.join(' ')}>
        <input type="checkbox"
          checked={completed}
          onChange={() => { toggleTodo(id) }} />
        <span className="item-text">{title}</span>
      </li>
      <button className="item-btn"
        onClick={() => { removeTodo(id) }}>Delete</button>
    </div>
  )
}