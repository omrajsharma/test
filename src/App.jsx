import React, { useState } from 'react'
import './App.css'

const App = () => {
  /**
   * 1. Build Delete functionality
   * 2. Make data persistent (ex - local storage, backend)
   * 3. PWA - optional
   */

  const [todos, setTodos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const handleFormInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleKeyDown = e => {
    if (e.key == 'Enter') {
      // update todos
      setTodos([
        {...formData, status: 'PENDING'},
        ...todos
      ])

      // reset form
      setFormData({
        title: "",
        description: ""
      })
    }
  }

  const handleTodoChange = e => {
    let updatedTodos = [...todos];
    updatedTodos[e.target.id].status = e.target.checked ? 'DONE' : 'PENDING'
    setTodos(updatedTodos)
  }
  
  return (
    <div>
      {
        todos.map((todo, idx) => {
          return (
            <div key={idx} className='todo-item'>
              <input type="checkbox" id={idx} onChange={handleTodoChange} />
              <div style={todo.status == 'DONE' ? {textDecoration: 'line-through'} : null}>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
              </div>
            </div>
          )
        })
      }

      <form>
        <div>
          <input type="text" name='title' placeholder='Title' value={formData.title} onChange={handleFormInput} onKeyDown={handleKeyDown} />
          <input type="text" name='description' placeholder='Description' value={formData.description} onChange={handleFormInput} onKeyDown={handleKeyDown} />
        </div>
      </form>

    </div>
  )
}

export default App
