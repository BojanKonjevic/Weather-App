import React from 'react'
import { UilSearch, UilLocationPoint  } from '@iconscout/react-unicons'

function Inputs() {
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input type="text" className='text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none' placeholder='Search'/>
            <UilSearch size={25} className="text-white cursor-pointer tranition ease-out hover:scale-125 duration-500"></UilSearch>
            <UilLocationPoint size={25} className="text-white cursor-pointer tranition ease-out hover:scale-125 duration-500"></UilLocationPoint>
        </div>
        <div className='flex flex-row w-1/4 items-center justify-end'>
            <button name='metric' className='text-xl text-white font-light tranition ease-out hover:scale-125 duration-500'>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='imperial' className='text-xl text-white font-light tranition ease-out hover:scale-125 duration-500'>°F</button>
        </div>
    </div>
  )
}

export default Inputs