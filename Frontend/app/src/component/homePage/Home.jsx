import React, { useEffect, useState } from "react";
import axios from "axios";
import '../homePage/Home.css'
import TaskDataGrid from "../DataTable/DataTable";

const Home = () => {
  const apiUrl = 'https://user-api-ulr5.onrender.com/user';
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const editTask = (id) => {
    setEditingTaskId(id);
    const editingTask = users.find((user) => user._id === id);
    setNewUser({ name: editingTask.name, email: editingTask.email });
  };

  const saveEditedTask = async () => {
    try {
      await axios.put(`${apiUrl}/${editingTaskId}`, newUser, { headers: { Authorization: `Bearer ${token}` } });
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === editingTaskId ? { ...user, ...newUser } : user)));
      setNewUser({ name: '', email: '' });
      setEditingTaskId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingTaskId ? saveEditedTask() : console.log("Submitting a new user");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div >
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='form-input'>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleChange}
            required={true}
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleChange}
            required={true}
          />
        </div>
       <div>
        <button type="submit">{editingTaskId ? 'Save Changes' : 'update'}</button>
        </div>
      </form>
      <TaskDataGrid users={users} editTask={editTask} />
    </div>
  )
};

export default Home;
