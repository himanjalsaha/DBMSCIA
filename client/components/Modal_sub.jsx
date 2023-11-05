import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import { BsPlusCircleDotted } from 'react-icons/bs';

const initialstate = {
  parent_todo_id: "",
  subtodo_text: "",
};

const SubtodoModal = ({ visiblesub, onClosesub, todoId }) => {
  

  if (!visiblesub) return null;
  const [state,setState]= useState(initialstate);
  const {parent_todo_id,subtodo_text}=state;


  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !subtodo_text) {
      console.log("Enter all details");
    } else {
      axios.post("http://localhost:5000/api/post/subtask", {
        parent_todo_id: todoId,subtodo_text
        
      }).then(() => {
        setState({subtodo_text:''});
      }).catch((err) => console.log(err.response.data));
      setTimeout(() => window.location.href = '/', 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg flex flex-col items-center justify-center' style={{ width: '30%' }}>
        <button onClick={onClosesub} className='p-1 rounded-full self-end m-2 hover:scale-125'>
          <FiX className='text-2xl' />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add a subtask</h2>
        <form style={{ width: '80%' }} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subtodoText">
              Add your subtask
            </label>
            <input
              type="text"
              id="subtodoText"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter subtodo text"
              required
              name="subtodo_text"
              value={subtodo_text || ""}
              onChange={handleInputChange}
            />
          </div>
        
       
          <div className="mb-6">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Create Subtodo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubtodoModal;
