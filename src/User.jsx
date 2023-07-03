import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export default function User(props) {
  const [hoverMoreData, setHoverMoreData] = useState(false);
  const [user, setUser] = useState(props.user);
  const [nameInput, setNameInput] = useState(props.user.name);
  const [emailInput, setEmailInput] = useState(props.user.email);

  const handleHoverMoreDataOver = () => {
    setHoverMoreData(true);
  };

  const handleHoverMoreDataOut = () => {
    setHoverMoreData(false);
  };

  const hasIncompleteTasks = () => {
    return props.todos.some(todo => !todo.completed);
  };

  const handleDelete = () => {
    props.handleDeleteUser(props.id);
  };

  const updateUser = () => {
    props.updateUser(props.id, nameInput, emailInput);
  };
  
  const showTodos = () => {
    props.openTodos(props.id);
  }

  return (
    <>
      <div className={`card border-2 ${hasIncompleteTasks() ? 'border-danger' : 'border-success'} ${(props.selectedUser === props.id) ? 'bg-warning-subtle' : ''}`}>
        <div className="card-body">
          <a className="me-1" onClick={showTodos}>ID:</a>{props.id}<br/>
          <label className="me-1">Name:</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          /><br/>
          <label className="me-1">Email:</label>
          <input
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          /><br/><br/>

          <button id="other-data" type="button" className="btn btn-secondary me-2" onMouseOver={handleHoverMoreDataOver} onMouseOut={handleHoverMoreDataOut}>Other Data</button>
          <button type="button" className="btn btn-secondary me-1" onClick={updateUser}>Update</button>
          <button type="button" className="btn btn-secondary" onClick={handleDelete}>Delete</button><br /><br />

          {hoverMoreData && <div style={{ border: '1px solid white', padding: '15px' , borderRadius: '25% 10%' }}>
            <label>Street:</label> <input type="text" value={user.address.street}></input><br />
            <label>City:</label> <input type="text" value={user.address.city}></input><br />
            <label>Zip Code:</label> <input type="text" value={user.address.zipcode}></input><br /><br />
          </div>}
        </div>
      </div>
    </>
  )
}
