import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import User from './User'
import Todo from './Todo'
import Post from './Post'
import 'bootstrap/dist/css/bootstrap.min.css'

const urlUser = 'https://jsonplaceholder.typicode.com/users';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [addTodoFlag, setAddTodoFlag] = useState(null);
  const [addPostFlag, setAddPostFlag] = useState(null);
  const [openTodoFlag, setOpenTodoFlag] = useState(null);
  const [openPostFlag, setOpenPostFlag] = useState(null);
  const [addNewUserFlag, setAddNewUserFlag] = useState(null);

  const [newTodo, setNewTodo] = useState({ userId: null, id: null, title: '', completed: false });
  const [newPost, setNewPost] = useState({ userId: null, id: null, title: '', body: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchTodos();
  }, []);

  async function fetchUsers() {
    const res = await axios.get(urlUser);
    setUsers(res.data)
    setFilteredUsers(res.data)
  }

  async function fetchTodos() {
    const res = await axios.get(urlTodos);
    setTodos(res.data)
  }

  async function fetchPosts() {
    const res = await axios.get(urlPosts);
    setPosts(res.data)
  }

  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = users.filter(user =>
      (user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
    );
    setFilteredUsers(filtered);
  }

  function handleDeleteUser(id) {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
    const newFilter = filteredUsers.filter(user => user.id !== id);
    setFilteredUsers(newFilter);
    const newTodos = todos.filter(todo => todo.userId !== id);
    setTodos(newTodos);
    const newPosts = posts.filter(post => post.userId !== id);
    setPosts(newPosts);
  }

  function openTodos(id) {
    setAddTodoFlag(null);
    setAddPostFlag(null);
    setOpenTodoFlag(id);
    setOpenPostFlag(id);
  }

  const updateTodos = (updatedTodos) => {
    const mergedTodos = todos.map(todo => {
      // Check if there's an updated version of the current todo in updatedTodos
      const updatedTodo = updatedTodos.find(updatedTodo => updatedTodo.id === todo.id);
      // If there's an updated version, return it, otherwise return the original todo
      return updatedTodo ? updatedTodo : todo;
    });
  
    // Now, check if there are any new todos in updatedTodos that were not in the original todos
    updatedTodos.forEach(updatedTodo => {
      if (!todos.some(todo => todo.id === updatedTodo.id)) {
        // This is a new todo, add it to the mergedTodos
        mergedTodos.push(updatedTodo);
      }
    });
  
    // Set the new state
    setTodos(mergedTodos);
  };
  

  const updateUser = (id, newName, newEmail) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, name: newName, email: newEmail };
      }
      return user;
    });
    setUsers(updatedUsers);

    // Update the filteredUsers array as well if needed.
    const updatedFilteredUsers = filteredUsers.map(user => {
      if (user.id === id) {
        return { ...user, name: newName, email: newEmail };
      }
      return user;
    });
    setFilteredUsers(updatedFilteredUsers);
  }

  const addingNewTodo = () => {
    // Increment the id to simulate new data addition.
    const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodoItem = {
      ...newTodo,
      id: nextId,
      userId: addTodoFlag
    };

    // Adding the new todo item to the todos array.
    setTodos(prevTodos => [...prevTodos, newTodoItem]);

    // Reset the newTodo state to clear the input fields.
    setNewTodo({ userId: null, id: null, title: '', completed: false });

    // Switch back to the openTodoFlag view after adding.
    setOpenTodoFlag(addTodoFlag);
    setAddTodoFlag(null);
  }

  const addingNewPost = () => {
    // Increment the id to simulate new data addition.
    const nextId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    const newPostItem = {
      ...newPost,
      id: nextId,
      userId: addPostFlag // Assuming the addPostFlag holds the userId.
    };
  
    // Adding the new post item to the posts array.
    setPosts(prevPosts => [...prevPosts, newPostItem]);
  
    // Reset the newPost state to clear the input fields.
    setNewPost({ userId: null, id: null, title: '', body: '' });
  
    // Switch back to the openPostFlag view after adding.
    setOpenPostFlag(addPostFlag);
    setAddPostFlag(null);
  };
  

  const openAddTodo = (id) => {
    setOpenTodoFlag(null);
    setAddTodoFlag(id);
  }

  const openAddPost = (id) => {
    setOpenPostFlag(null);
    setAddPostFlag(id);
  }

  const openAddUser = () => {
    setAddTodoFlag(false);
    setAddPostFlag(false);
    setOpenTodoFlag(false);
    setOpenPostFlag(false);
    setAddNewUserFlag(true);
  }

  const addNewUser = () => {
    const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const nextUser = {
      id: nextId,
      name: newUser.name,
      email: newUser.email
    }
  
    // Adding the new user to the users array and the filteredUsers array
    setUsers(prevUsers => [...prevUsers, nextUser]);
    setFilteredUsers(prevFilteredUsers => [...prevFilteredUsers, nextUser]);

  
    // Resetting the newUser state to clear the input fields
    setNewUser({ name: '', email: '' });
  
    // Reset the addNewUserFlag to false to go back to the normal view.
    setAddNewUserFlag(false);
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <label className='me-2'>Search:</label><input className='me-1' type="search" onChange={handleSearch}></input><button onClick={openAddUser} className='btn btn-secondary'>Add</button>
          <br /><br />
        </div>
        <div className="col-md-5">
          {filteredUsers.map((user) => (
            <User
              key={user.id}
              id={user.id}
              user={user}
              todos={todos.filter(todo => todo.userId === user.id)}
              posts={posts.filter(post => post.userId === user.id)}
              handleDeleteUser={handleDeleteUser}
              openTodos={openTodos}
              selectedUser={openTodoFlag}
              updateUser={updateUser} />
          ))}
        </div>

        <div className='col-md-7'>

        {addNewUserFlag && <div className="card">
            <div className="card-body">
              <label className="card-text m-4">Name:</label>
              <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}></input><br />
              <label className="card-text m-4">Email:</label>
              <input type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}></input><br />
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-secondary me-md-2" type="button" onClick={() => { setAddNewUserFlag(null); }}>Cancel</button>
                <button className="btn btn-secondary" type="button" onClick={addNewUser}>Add</button>
              </div>
            </div>
          </div>}

          {addTodoFlag && <div className="card">
            <div className="card-body">
              <label className="card-text m-4">Title:</label><input type="text" value={newTodo.title} onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}></input><br />
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-secondary me-md-2" type="button" onClick={() => { setOpenTodoFlag(addTodoFlag); setAddTodoFlag(null); }}>Cancel</button>
                <button className="btn btn-secondary" type="button" onClick={addingNewTodo}>Add</button>
              </div>
            </div>
          </div>}

          {openTodoFlag && <Todo id={openTodoFlag} todos={todos.filter(todo => todo.userId === openTodoFlag)} updateTodos={updateTodos} addTodo={openAddTodo} />}

          {openPostFlag && <Post id={openPostFlag} posts={posts.filter(post => post.userId === openPostFlag)} addPost={openAddPost} />}

          {addPostFlag && <div className="card">
            <div className="card-body">
              <label className="card-text m-4">Title:</label><input type="text" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}></input><br />
              <label className="card-text m-4">Body:</label><input type="text" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}></input><br />
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-secondary me-md-2" type="button" onClick={() => { setOpenPostFlag(addPostFlag); setAddPostFlag(null); }}>Cancel</button>
                <button className="btn btn-secondary" type="button" onClick={addingNewPost}>Add</button>
              </div>
            </div>
          </div>}

        </div>

      </div>
    </>
  )
}
