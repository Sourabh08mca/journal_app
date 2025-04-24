import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function JournalList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/${id}`)
      .then(() => {
        toast.success("Entry deleted");
        fetchUsers();
      })
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        className="block text-center mb-6 text-blue-600 font-semibold underline"
        to="/form"
      >
        + Add New Entry
      </Link>
      <div className="grid gap-6">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-2xl p-6 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              📓 Title: {user.title}
            </h2>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              ✍️ Content: {user.content}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              📅 Date: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-3">
              <Link
                to= {`/update/${user._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
