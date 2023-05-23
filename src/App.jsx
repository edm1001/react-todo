import { useState } from 'react'
import '../src/styles.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

function handleSubmit(e) {
  e.preventDefault()

  setTodos(currentTodos => {
    return [
      ...currentTodos,
      {id: crypto.randomUUID(), title: newItem, completed: false}
    ]
  } )
  
  function toggleTodo(id,completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}        
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  
  setNewItem("")
}

  return (
    <>
  <form onSubmit={handleSubmit} className='new-item-form'>
    <div className="form-row">
      <label htmlFor='item'>New Item</label>
      <input type='text' 
      value={newItem} 
      // targets the event setNewItem, make it able to be changed by the newItem
      onChange={e => setNewItem(e.target.value)} 
      id='item'
      />
    </div>
    <button className='btn'> Add </button>
  </form>
    <h1 className='header'> To-do List</h1>
    <ul>
      {todos.map(todo => {
        return (

          <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id,e.target.checked)} />
          {todo.title}
        </label>
        <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
      )
      })}
     
    </ul>
  </>
    )
}


