import React from 'react'
import {PiChatCircle} from 'react-icons/pi'
function Chats() {
  return (
    <div style={{width:'35%' , height:'90%'}} className='bg-white w-30 h-90 rounded-2xl  '>
      <div className='flex flex-row font-mono text-xl justify-center'>
        Chats<PiChatCircle className='m-1'/>
        </div>
        <div className=' bg-slate-200 rounded-lg m-2'>
      <div className='p-2 flex flex-row items-center'>
        <img src="https://th.bing.com/th/id/OIP.k4samsjVbQ2hPOPeERIC_gHaHE?pid=ImgDet&rs=1" alt="" className='w-10 h-10 rounded-3xl'/>
      <text className=' text-lg font-bold p-2'>Arjit Singhal</text>

        <span class="relative flex h-3 w-3 m-1"x>

  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span>
      </div>
      <div className='p-3'>
        <text>paisa dede bhai</text>
      </div>
      </div>

      <div className=' bg-slate-200 rounded-lg m-2'>
      <div className='p-2 flex flex-row items-center'>
        <img src="https://th.bing.com/th/id/OIP.k4samsjVbQ2hPOPeERIC_gHaHE?pid=ImgDet&rs=1" alt="" className='w-10 h-10 rounded-3xl'/>
      <text className=' text-lg font-bold p-2'>Arjit Singhal</text>

        <span class="relative flex h-3 w-3 m-1"x>

  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span>
      </div>
      <div className='p-3'>
        <text>paisa dede bhai</text>
      </div>
      </div>

    </div>
  )
}

export default Chats