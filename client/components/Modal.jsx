import React from 'react'
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
const initialstate={
    title: '',
    description: '',
    due_date: '',
    priority: 'Low',
    status: 'To-Do',
    
};

const Modal = ({visible,onClose}) => {
  

    if(!visible) return null;
    const [state,setState]= useState(initialstate);
  const {title, description, due_date, priority, status}=state;

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!title|| !description|| !due_date || !priority || !status){
      console.log("enter all details");
    }
    else{
      axios.post("http://localhost:5000/api/post",{
        title, description, due_date, priority, status
      }).then(()=>{
        setState({title: '',
        description: '',
        due_date: '',
        priority: '',
        status: '',
        });
      }).catch((err)=>console.log(err.response.data));
      setTimeout(()=>
      window.location.href = '/',500);
    }
  }

  const handeInputChange=(e)=>{
const{name,value} = e.target;
setState({...state,[name]:value})

  } 
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
    flex justify-center items-center'>
        <div className='bg-white p-5 rounded-lg flex flex-col items-center justify-center' style={{width:'30%',height:'95%'}}>
        <button onClick={onClose} className='p-1 rounded-full self-end m-2 hover:scale-125'>
  <FiX className='text-2xl' />
</button>
      <h2 className="text-xl font-semibold mb-4">Add your Todo</h2>
      <form style={{ width: '80%' }} onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
      Title
    </label>
    <input
      type="text"
      id="title"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      placeholder="Enter title for todo"
      required
      name="title"
      value={title || ""}
      onChange={handeInputChange}
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">
       Description
    </label>
    <textarea
      id="projectDescription"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      rows="4"
      placeholder="Enter description"
      name="description"
      value={description || ""}
      onChange={handeInputChange}

    ></textarea>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
      Due date
    </label>
    <input
      type="datetime-local"
      id="due_date"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      required
      name='due_date'
      value={due_date|| ""}

      onChange={handeInputChange}

    />
  </div>

  <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
    Priority
  </label>
  <select 
    id="priority"
    name="priority"
    required
    value={priority || ""}
    defaultValue="Low"
    onChange={handeInputChange}
    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-100 active:border-blue-300"
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>


  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectManager">
      status
    </label>
    <select
    id="status"
    name="status"
    required
    value={status || ""}
    defaultValue="To-Do"
    onChange={handeInputChange}
    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-100 active:border-blue-300"
  >
    <option value="To-Do">To-Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>
  </div>


  {/* Add more fields for budget, tasks, privacy settings, etc., as needed */}
  
 

  <div className="mb-6">
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      Create 
    </button>
  </div>
</form>
</div>
</div>
  )
}

export default Modal