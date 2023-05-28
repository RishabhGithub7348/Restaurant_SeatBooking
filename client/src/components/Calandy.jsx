import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import SetCalander from './SetCalander';
import SetTime from './SetTime';
import { IoEarthSharp } from "react-icons/io5";
import SetTimezone from './SetTimezone';
import Form from './Form';
import { UserContext } from '../context/userContext';
import Details from './Details';


const Calandy = () => {
  const { showForm } = useContext(UserContext);

  return (
    <div className='w-full h-full bg-white p-3 flex items-center flex-col '>
      
      {!showForm ? (
          <>
      <div className='flex items-center flex-col mt-4 w-[1324px] bg-white rounded-lg  p-2'>
        
            <div className='grid grid-cols-10 gap-1'>
              <div className='col-span-4'>
              <Details />
              </div>
              <div className='col-span-3'>
              <div className='flex flex-col gap-10'>
              <div className='flex items-center justify-start mt-6'>
        <h1 className='font-bold text-gray-700 font-sans text-2xl'>Select a Date & Time</h1>
      </div>
              <div className=''>
              <SetCalander />
                <div className='hidden flex-col mt-6'>
              <div className='flex items-center justify-start ml-16'>
                <h1 className='text-lg font-bold -ml-8 opacity-90'>Timezone</h1>
              </div>
              <div className='flex items-center mt-3 p-2 bottom-2 rounded-md bg-slate-100'>
                <IoEarthSharp className='text-2xl cursor-pointer' />
                <SetTimezone  />
              </div>
            </div>
              </div>
              </div>
              </div>
              <div className='col-span-3'>
                <div className=''>
                  <SetTime />
                </div>
              </div>
            </div>
            
            </div>
          </>
        ) : (
          <>
           <div className='flex items-center flex-col mt-4 w-[1020px] bg-white rounded-lg  p-2'>
            <div className='grid grid-cols-6 gap-2'>
              <div className='col-span-3'>
               <Details/>
              </div>
              <div className='col-span-3'>
              <Form/>
              </div>
            </div>
           </div>
          </>
          
        )}
      
    </div>
  );
}

export default Calandy;
