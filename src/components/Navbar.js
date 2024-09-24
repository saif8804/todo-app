import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-slate-800 text-white py-2 '>
        <div className='mx-8'> 
            <h1>Itask</h1>
        </div>
        <ul className='flex gap-8 mx-8'>
           <li>Home</li>
           <li>yourTask</li>
        </ul>
    </div>
  )
}

export default Navbar