import React from 'react';
import Timer from './Timer.jsx';
import { BiRightArrowAlt ,BiGrid,BiListUl,BiDotsVertical } from 'react-icons/bi';
import {TiTick} from 'react-icons/ti'
import { PiPlus } from 'react-icons/pi';
import ProgressBar from './ProgressBar.jsx';
import Modal from './Modal.jsx';
import { useState,useEffect } from 'react';
import {BsArrowDownRight} from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiMoon,BiPlus,BiBell,BiSearch,BiArrowBack } from 'react-icons/bi';
import {FcTodoList,FcCheckmark} from 'react-icons/fc'
import {TbProgress, TbProgressAlert} from 'react-icons/tb'
import Chats from './Chats.jsx';
import Quotes from './Quotes.jsx';
import Modal_sub from './Modal_sub.jsx';
import axios from 'axios';
import Viewtask from './Viewtask.jsx';
import SideNavbar from './SideNavbar.jsx';
import Calendar from './calender.jsx';
const Home = () => {
  const [data,setdata]= useState([])
  const [datasubtodo,setdatasubtodo] = useState([])

  
  const loadData = async (status) =>{
      let response = await axios.get(`http://localhost:5000/api/get/${status}`)

      setdata(response.data );  

  };
  const loadDatasubtodo = async()=>{
    const subtodo  = await axios.get("http://localhost:5000/api/get/subtodos")
    setdatasubtodo(subtodo.datasubtodo)
  } 

  const count = async()=>{
    const todoResponse = await axios.get(`http://localhost:5000/api/get/todo`);
      const inProgressResponse = await axios.get(`http://localhost:5000/api/get/inprogress`);
      const doneResponse = await axios.get(`http://localhost:5000/api/get/done`);
      setTodoCount(todoResponse.data.length);
      setInProgressCount(inProgressResponse.data.length);
      setDoneCount(doneResponse.data.length);
  }
  useEffect(()=>{
    count(),
      loadData("todo");
      loadDatasubtodo();
  },[])

  const [todoCount, setTodoCount] = useState(0);
const [inProgressCount, setInProgressCount] = useState(0);
const [doneCount, setDoneCount] = useState(0);

const [showSidebar, setShowSidebar] = useState(true);
const [showBackIcon, setShowBackIcon] = useState(false);


const toggleSidebar = () => {
  setShowSidebar(!showSidebar);
  setShowBackIcon(!showBackIcon);
};


  

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const currenttime = currentDate.getHours();
  const currentTime = new Date();
 
// Get the current hour from the date
const currentHour = currentTime.getHours();
const morningStart = 6; // 6 AM
const afternoonStart = 12; // 12 PM (noon)
const eveningStart = 18; 
let greeting;

if (currentHour >= morningStart && currentHour < afternoonStart) {
  greeting = 'Good morning';
} else if (currentHour >= afternoonStart && currentHour < eveningStart) {
  greeting = 'Good afternoon himanjal';
} else {
  greeting = 'Good evening';
}
  const progress =   parseInt((doneCount/(todoCount+inProgressCount))*100);

  

  
  const [showMymodel,setMyModel] = useState(false)
  const handleOnClose= () => setMyModel(false)

  const [showMysubmodel,setMysubModel] = useState(false)
  const handleOnClosesub= () => setMysubModel(false)

  const [showMyviewmodel,setMyviewModel] = useState(false)
  const handleOnCloseview= () => setMyviewModel(false)

  
  

  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedtitle , setSelectedtitle] = useState(null);
  
  const handleAddSubtodo = (todoId) => {
    // Open the subtodo modal
    setMysubModel(true);
  
    // Store the selected todo's ID in the component's state
    setSelectedTodoId(todoId);
    console.log("Selected Todo ID: " + todoId);
    
  };
  
  const handleviewSubtodo = (todoId,todotitle) => {
    // Open the subtodo modal
    setMyviewModel(true);
  
    // Store the selected todo's ID in the component's state
    setSelectedTodoId(todoId);
    setSelectedtitle(todotitle);
    console.log("Selected Todo ID: " + todoId);
    console.log("selected title:"+ todotitle )
    
  };

 

  
  

  const getBackgroundColorClass = (priority) => {
    switch (priority) {
      case "High" :
        return "bg-red-200 , text-red-600";
      case "Medium":
        return "bg-yellow-50 , text-yellow-300";
      case "Low":
        return "bg-green-200 , text-green-500";
      default:
        return ""; // Default or fallback background color class
    }
  };
  const getstatusbg=(status)=>{
    switch(status){
      case "To-Do" :
        return "bg-red-400";
      case "In Progress":
        return "bg-yellow-300";
      case "Done":
        return "bg-green-200";
      default:
        return "";
    };
  };
  const getstatusbgcard=(status)=>{
    switch(status){
      case "To-Do" :
        return "bg-red-100";
      case "In Progress":
        return "bg-yellow-100";
      case "Done":
        return "bg-green-100";
      default:
        return "";
    };
  }
  
  return (

   <div style={{background:'#f3f6fd',minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    
    <div>
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="flex flex-row items-center justify-center">
          <div>
          <button onClick={toggleSidebar}>          {showBackIcon ? <BiArrowBack className="mx-5 bg-violet-200 rounded-full w-10 h-10 p-2" /> : <GiHamburgerMenu className="mx-5 bg-violet-200 rounded-full  w-10 h-10 p-2" />}
</button>

          {showSidebar && <SideNavbar />}
          </div>
          
          {/* <div className="relative rounded-full  bg-white flex items-center">
            <input
              type="text"
              className='rounded-l-full shadow-md rounded-r-none p-2 outline-none'
           
              placeholder='  Search'
            />
            <button className="rounded-r-full border-l-2  border-violet-100 shadow-md p-2 w-10 h-10 bg-white text-black">
              <BiSearch className=''/>
            </button>
          </div> */}
          
        </div>
        <div className="flex flex-row items-center">
          <BiBell className="mx-1 w-5 h-5 hover:bg-violet-100 rounded-full " />
          <BiMoon className="mx-1 w-5 h-5 hover:bg-violet-100 rounded-full" />
          <button onClick={()=>setMyModel(true)}  ><BiPlus className="mx-1 w-5 h-5 bg-slate-400 rounded-full hover:bg-white " /></button>
          <div className="h-8 border-l-2 border-gray-500 mx-4"></div>
          <img src="https://i.pinimg.com/originals/c1/54/e5/c154e58bacadaae4c92e5fe4cdc72002.jpg" alt=""  className='w-8 h-8'/>
          
        </div>
      </div>
    </div>
    </div>
    {/* card for todo */}
    <div className='flex flex-row mx-8'>
    <div className='bg-white shadow-md ml-20 p-4 rounded-2xl ' style={{height:'90%',width:'80%'}}>
      <div className='flex justify-between items-center'>

        <div className='flex flex-col'>
          <div className='flex flex-row'>
          <text className='font-mono text-lg p-1'>Jump to</text>
          <BsArrowDownRight className='m-2'/>

          </div>
        <div className='flex flex-row'>
        <button onClick={() => {
    loadData("todo");
  }}  className='bg-red-100 rounded p-1 m-1 flex-row flex'>To-do's<FcTodoList className='m-1'/></button>
        <button onClick={() => {
    loadData("inprogress");
  }}  className='bg-yellow-100 rounded p-1 m-1 flex-row flex'>In Progress <TbProgress className='m-1 text-yellow-600'/></button>
        <button   onClick={() => {
    loadData("done");
  }} className='bg-green-100 rounded p-1 m-1 flex-row flex'>Done<FcCheckmark className='m-1'/></button>
        </div>
        

        </div>
      <div className='flex flex-col bg-violet-100 p-4 rounded-lg'>
      <p className="max-w-lg text-lg font-mono leading-relaxed text-gray-900 dark:text-black">{greeting} </p>
      <ProgressBar progress={progress}/>
      <text className='flex font-semibold'>{progress}%</text>

      </div>

      <text className='font-mono text-lg p-1'>{day} {month} {year}</text>
      </div>
      <div className='p-1'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <div className='flex flex-row p-2'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='bg-violet-100 flex rounded-full w-10 h-10 items-center justify-center'>
              <text>{inProgressCount}</text>
            </div>
            <text className='font-extralight text-sm'>In progress</text>

          </div>
          <div className='flex flex-col justify-center items-center gap-2 '>
            <div className='bg-violet-100 flex rounded-full w-10 h-10 items-center justify-center'>
              <text>{todoCount}</text>
            </div>
            <text className='mx-3  font-extralight text-sm'>Todo's</text>

          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='bg-violet-100 flex rounded-full w-10 h-10 items-center justify-center'>
              <text>{doneCount}</text>
            </div>
            <text className='mx-2 font-extralight text-sm'>Done</text>

          </div>

          </div>
          <div className='flex flex-row '>
          <BiGrid className='mx-2 w-8 h-8  hover:bg-violet-100 rounded-full p-1'/>
            <BiListUl className='w-8 h-8 hover:bg-violet-100 rounded-full p-1 '/>
          </div>
        </div>
        {/* cards */}
        <div   className="grid grid-cols-4 gap-2">
           
        {data.length === 0 ? (
    <div className="bg-red-200 rounded-lg flex items-center justify-center"><text className='text-red-400 font-bold'>Nothing to show here</text></div>
  ) : (

        data.map((item, index) => {

      
            return (
        <div onClick={()=>handleviewSubtodo(item.id,item.title)} className={` rounded-3xl  ${getstatusbgcard(item.status)} items-center shadow-md   `} key={index} >
  <div className='flex flex-row justify-between items-center m-2'>
    <text className='p-1 text-xs  opacity-50' >{item.created_at}</text>
    <BiDotsVertical/>
  </div>
  <div className='flex flex-col items-center m-2 '>
    <div className='text-xl font-semibold text-gray-600'>{item.title}</div>
    <div className='text-lg font-thin'>{item.description}</div>

  </div>
  <div className='p-3'>
  <text className={`font-bold text-xs rounded-2xl p-2 ${getBackgroundColorClass(item.priority)}`}>
  {item.priority}
</text>    
<button
      onClick={() => handleAddSubtodo(item.id)}
      className=" p-2 rounded-md"
    >
      
      <BiPlus className='bg-red-400  rounded-full'/>
    </button>
    

      <p className="max-w-lg text-lg font-mono leading-relaxed text-gray-900 dark:text-black p-2"> </p>
      <ProgressBar progress={item.id}/>
      <text className='flex font-semibold'>{item.id}%</text>

    


  </div>
  
  <div className='flex justify-between'>
  <div className='p-2 flex-row flex items-center'>
 
   <div className='rounded-2xl items-center flex my-1 p-1'> <text className={`font-bold text-xs rounded-2xl p-2 ${getstatusbg(item.status)}`}>
  {item.status}
</text> </div>
  </div>
  <div className='p-2'>
  <div className='  bg-slate-200 rounded-2xl items-center flex my-1 p-1'><text className='text-xs text-blue-600 p-1 font-bold'>{parseInt(Math.abs(new Date(item.due_date) - new Date())/(1000 * 60 * 60 * 24))}  days { Math.abs( currenttime -(new Date(item.due_date)).getHours() )} hours left</text></div>
  </div>
  </div>
</div> 


 );
})
)}   
</div>  
      </div>
      
    </div>
  
   <div className='m-2' ></div>
   <div className='flex flex-col'>
   <Calendar />
   <div className='mb-2'/>
   <Quotes/>
   </div>
  
   

 
 
   
    </div>
   

   
    <Modal onClose={handleOnClose}  visible={showMymodel} />
    <Modal_sub onClosesub={handleOnClosesub}  visiblesub={showMysubmodel} todoId={selectedTodoId} />
    <Viewtask onClose={handleOnCloseview} isOpen={showMyviewmodel} todoId={selectedTodoId} todotitle={selectedtitle} />
  
     
   </div> 
  );
};

export default Home;
