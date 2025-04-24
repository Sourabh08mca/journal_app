import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function JournalForm() {

    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
            setTitle(result.data.title)
            setContent(result.data.content)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/update/'+id, { title, content })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
    }

   return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded mt-10">
    <h1 className='text-bold text-4xl mt-4'>UpdateForm</h1>
      <form onSubmit={Update} className="mb-6">
        <input
          type="text"
          className="w-full border p-2 mb-2 rounded"
          placeholder="Title"
         value={title}  
         onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Write your thoughts..."
         
         value={content}
         onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
