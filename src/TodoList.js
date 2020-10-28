import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map((item) => {
        return (
          <TodoItem key={item.id} {...item} />
        )
      })
      }
    </ul>
  )
}