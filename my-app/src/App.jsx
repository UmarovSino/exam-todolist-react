import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [data, setData] = useState([
    { id: 1, name: 'Ismoil', age: 12, status: false },
    { id: 2, name: 'Ahmad', age: 42, status: true }
  ]);

  const [addName, setAddName] = useState('');
  const [addAge, setAddAge] = useState('');
  const [addStatus, setAddStatus] = useState('false');
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editStatus, setEditStatus] = useState('false');
  const [search, setSearch] = useState('');
  const [idx, setIdx] = useState(null)

  const deleteUser = (id) => {
    setData(data.filter((user) => user.id !== id));
  };

  const statusFunc = (id) => {
    setData(
      data.map((user) => {
        if (user.id === id) {
          user.status = !user.status;
        }
        return user;
      })
    );
  };
  const addUser = () => {
    const newUser = {
      id: Date.now(),
      name: addName,
      age: addAge,
      status: addStatus === 'true'
    };
    setData([...data, newUser]);
    setAddAge(""),
      setAddName(""),
      setAddStatus('false')
  };


  const editUser = () => {
    setData(
      data.map((user) => {
        if (user.id === idx) {
          user.name = editName,
            user.age = editAge,
            user.status = editStatus == 'true'

        }
        return user
      })

    )
    setEditAge(""),
      setEditName(""),
      setEditStatus('false')
  }


  const editFunc = (user) => {
    setEditName(user.name);
    setEditAge(user.age);
    setEditStatus(user.status ? 'true' : 'false');
    setIdx(user.id);
  }






  const filteredData = data.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="container">

      <div className="form-section">
        <input
          type="text"
          placeholder="addName"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          className='add-Name'
        />
        <input
          type="text"
          placeholder="addAge"
          value={addAge}
          onChange={(e) => setAddAge(e.target.value)}
          className='add-Age'
        />
        <select value={addStatus} onChange={(e) => setAddStatus(e.target.value)} className='add-Select'>
          <option value="true">active</option>
          <option value="false">inactive</option>
        </select>
        <button onClick={addUser} className='user-Save'>Save</button>
      </div>

      <div className="form-section">
        <input
          type="text"
          placeholder="editName"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className='edit-Name'
        />
        <input
          type="text"
          placeholder="editAge"
          value={editAge}
          onChange={(e) => setEditAge(e.target.value)}
          className='edit-Age'
        />
        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className='edit-Select'>
          <option value="true">active</option>
          <option value="false">inactive</option>
        </select>
        <button onClick={editUser} className='edit-Save'>Edit Save</button>
      </div>

      <div className="form-section">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='search-input'
        />
      </div>



      <div className="user-list">
        {filteredData.map((user) => (
          <div key={user.id} className="user-card">
            <p className='user-Name'>
              <strong>Name:</strong> {user.name}
            </p>
            <p className='user-Age'>
              <strong>Age:</strong> {user.age}
            </p>
            <p className='user-Status'>
              <strong>Status:</strong> {user.status ? 'active' : 'inactive'}
            </p>
            <button onClick={() => deleteUser(user.id)} className='button-delete'>Delete</button>
            <button onClick={() => statusFunc(user.id)} className='button-Status'> Status</button>
            <button onClick={() => editFunc(user)} className='button-Edit'>Edit</button>


          </div>
        ))}
      </div>
    </div>
  );
}
