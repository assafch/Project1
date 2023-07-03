import React from 'react';
import './App.css';

export default function Todo(props) {

  const handleMarkComplete = (id) => {
    const updatedTodos = props.todos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    props.updateTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    props.addTodo(props.id);
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <h5 className="mb-1 me-2 flex-grow-1">todos - User {props.id}</h5>
        <button type="button" className="btn btn-secondary" onClick={handleAddTodo}>Add</button>
      </div>
      {props.todos.map((todo) => (
        <div key={todo.id} className="list-group">
          <div className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center">
              <label className='col-form-label col-form-label-sm me-2'>Title:</label>
              <p className="mb-1 flex-grow-1">{todo.title}</p>
            </div>
            <div className="d-flex align-items-center">
              <label className='col-form-label col-form-label-sm me-2'>Completed:</label>
              <p className="mb-1 me-2 flex-grow-1">{todo.completed ? 'Yes' : 'No'}</p>
              {!todo.completed ? <button type="button" className="btn btn-secondary" onClick={() => handleMarkComplete(todo.id)}>Mark Complete</button> : null}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
