import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


export default function Post(props) {

  const  addingNewPost = () => {
    props.addPost(props.id);
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <h5 className="mb-1 me-2 flex-grow-1">Posts - User {props.id}</h5>
        <button type="button" className="btn btn-secondary" onClick={addingNewPost}>Add</button>
      </div>
      {props.posts.map((post) => (
        <div key={post.id} className="list-group">
          <div className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center">
              <label className='col-form-label col-form-label-sm me-2'>Title:</label>
              <p className="mb-1 flex-grow-1">{post.title}</p>
            </div>
            <div className="d-flex align-items-center">
              <label className='col-form-label col-form-label-sm me-2'>Body:</label>
              <p className="mb-1 me-2 flex-grow-1">{post.body}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
