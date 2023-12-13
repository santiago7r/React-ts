
import { useEffect, useState } from "react";
import useUsers from "./hooks/useUsers";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

 
function App() {
  const {users, errors, loading, setUsers, setErrors } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id));

    userService.delete(user.id).catch(err => {
      setErrors(err.message);
      setUsers(originalUsers);
    })
  }

  const addUser = () => {
    const originalUsers = [...users]
    const newUser = {
      id: 55,
      name: 'Test Name'
    }

    setUsers([...users, newUser])

    userService.create(newUser)
    .then(({ data: newUserSaved }) => setUsers([...users, newUserSaved]))
    .catch(err => {
      setErrors(err.message);
      setUsers(originalUsers);
    })
  }

  const updateUser = (user: User) => {
    const originalUsers = [...users]
    const updatedUser = { ...user, name: user.name + '!!'};
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))

    userService.update(updatedUser)
      .catch(err => {
        setErrors(err.message);
        setUsers(originalUsers)
      })
  }

  return (
    <>
      {loading && <p className="spinner-border"></p>}
      {errors && <p className="text-danger">{errors}</p>}
      <button className="btn btn-primary mb-3" onClick={addUser}>Add User</button>
      <ul className="list-group">
        {users.map(user => 
        <li key={user.id} className="list-group-item d-flex justify-content-between">
          {user.name}
          <div>
          <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
          <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
          </div>
        </li>)}
      </ul>
    </>
  )
} 

export default App;
