import React, { useState } from 'react';
import { FaHome, FaClock, FaArrowLeft } from 'react-icons/fa';

const SideNavbar = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div >
         <div
      className={`fixed  h-full bg-violet-200 w-20 text-white transition-transform transform-gpu ${
        isCollapsed ? 'scale-0' : ''
      } rounded-t-3xl rounded-b-2xl`}
      style={{height:'90%',width:'4%'}}

    >
      {/* <div
        className="absolute top-4 left cursor-pointer text-xl"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaArrowLeft /> : <FaArrowLeft />}
      </div> */}
      <ul className="mt-20">
        <li className="py-2 pl-6 hover-bg-blue-700">
          <FaHome className='w-8 h-8' />
        </li>
        <li  className="py-2 pl-6 hover-bg-blue-700">
            <FaClock className='w-8 h-8'/>

           
        </li>
      </ul>
    </div>
    </div>
   
  );
};

export default SideNavbar;
