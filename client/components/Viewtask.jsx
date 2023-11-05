import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiX } from 'react-icons/fi';
import ProgressBar from './ProgressBar';

const Viewtask = ({ isOpen, onClose, todoId, todotitle }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalCheckedSubtodos, setTotalCheckedSubtodos] = useState(0);
  const [percentageProgress, setPercentageProgress] = useState(0); // Added state for percentage

  // Generate a unique local storage key for each todo
  const localStorageKey = `checkedItems_${todoId}`;

  // Save the state of the checkbox at a specific index to local storage
  const saveCheckboxState = (isChecked) => {
    localStorage.setItem(localStorageKey, JSON.stringify(isChecked));
  };

  // Load the checkbox states from local storage when the component mounts
  useEffect(() => {
    const storedCheckedItems = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedCheckedItems) {
      setCheckedItems(storedCheckedItems);
    } else {
      // Initialize with an array of false values if no stored data
      setCheckedItems(new Array(subtasks.length).fill(false));
    }
  }, [localStorageKey, subtasks]);

  useEffect(() => {
    // Fetch subtasks when the modal is open for a specific parent ID (todoId)
    if (isOpen) {
      axios
        .get(`http://localhost:5000/api/get/subtodo/${todoId}`)
        .then((response) => {
          setSubtasks(response.data);

          // Calculate the percentage of progress
          const totalSubtasks = response.data.length;
          if (totalSubtasks > 0) {
            const totalChecked = response.data.filter((subtask) => checkedItems[subtask.id]).length;
            const progress = (totalChecked / totalSubtasks) * 100;
            setPercentageProgress(progress);
          } else {
            setPercentageProgress(0);
          }
        })
        .catch((error) => {
          console.error('Error fetching subtasks:', error);
        });
    }
  }, [isOpen, todoId, todotitle, checkedItems]);

  const handleCheck = (index) => {
    // Update the state of the checkbox in memory
    setCheckedItems((previousCheckedItems) => {
      const newCheckedItems = [...previousCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      saveCheckboxState(newCheckedItems); // Save the checkbox state to local storage
      return newCheckedItems;
    });
  };

  useEffect(() => {
    // Calculate the total number of checked subtodos
    const checkedCount = checkedItems.filter((item) => item).length;
    setTotalCheckedSubtodos(checkedCount);
  }, [checkedItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg flex flex-col items-center justify-center" style={{ width: '30%', fontFamily: 'Arial' }}>
        <button onClick={onClose} className="p-1 rounded-full self-end m-2 hover:scale-125">
          <FiX className="text-2xl text-gray-600 hover:text-gray-800" />
        </button>

        <ul>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">{todotitle}</h2>
          
          {subtasks.map((subtask, index) => (
            <li key={index} className={`text-lg text-gray-800 ${checkedItems[subtask.id] ? 'line-through' : ''}`}>
              <input
                type="checkbox"
                className="w-4 h-4 m-2"
                checked={checkedItems[subtask.id]}
                onChange={() => handleCheck(subtask.id)}
              />
              {subtask.subtodo_text}
            </li>
          ))}
         
        
        </ul>
      </div>
    </div>
  );
};

export default Viewtask;
