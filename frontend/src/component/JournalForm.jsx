import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JournalForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/form', { title, content })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded mt-10">
    <h1 className='text-bold text-4xl mt-4'>JournalForm</h1>
      <form onSubmit={Submit} className="mb-6">
        <input
          type="text"
          className="w-full border p-2 mb-2 rounded"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Write your thoughts..."
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  );
}
