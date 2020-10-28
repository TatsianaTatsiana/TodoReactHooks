import React, { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { Context } from './context';
import { Sort } from './Sort';
import { SearchItems } from './SearchItems';
import { FilterStatus } from './FilterStatus'

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('todos') || [];
    setTodos(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (event) => {
    if (event.key === 'Enter') {
      setTodos([...todos, {
        id: Date.now(),
        title: todoTitle,
        completed: false,
      }
      ])
      setTodoTitle('');
    }
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => {
      return todo.id !== id
    }))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const sortItem = (value) => {
    let sortedItems = [...todos]
    if (value === 'az') {
      sortedItems.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else {
          return 1
        }
      })
      setTodos(sortedItems)
    }
    if (value === 'za') {
      sortedItems.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        } else {
          return 1
        }
      })
      setTodos(sortedItems)
    };
  }

  const searchItems = (search) => {
    setSearch(search)
  }

  const seARCH = (search) => {
    if (search.length === 0) {
      return todos;
    }
    let copy = [...todos];
    return copy.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase())
    });
  }

  const filterStatusChange = (filterValue) => {
    setFilterValue(filterValue)
  }

  const filter = (todos, filterValue) => {
    switch (filterValue) {
      case 'all':
        return todos;
      case 'done':
        return todos.filter((item) => { return item.completed })
      case 'not done':
        return todos.filter((item) => { return !item.completed })
      default:
        return todos
    }
  }

  const visibleItems = filter(seARCH(search), filterValue)
  return (
    <Context.Provider value={{
      toggleTodo, removeTodo
    }}>
      <div className="container">
        <h1 className="title">Todo app</h1>

        <div className="settings">

          <div className="add-wrapper">
            <input className="input" type="text"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
              onKeyPress={addTodo}
              placeholder="What needs to be done" />
            <label className="add-text">Write a new task</label>
          </div>
          <Sort sortItem={sortItem} />
          <SearchItems searchItems={searchItems} />
          <FilterStatus
            filterStatusChange={filterStatusChange}
            filterValue={filterValue} />
        </div>

        <TodoList todos={visibleItems} />
      </div>
    </Context.Provider>
  );
}
