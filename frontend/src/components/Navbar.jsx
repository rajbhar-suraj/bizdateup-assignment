import React from 'react'
import { navbarControls } from '../constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-3 bg-gray-100 shadow-md'>
            <Link to="/" className='font-medium text-xl pl-10'>
                Todos
            </Link>
            <div className='flex gap-10 pr-10'>
                {
                    navbarControls.map((nav) => {
                        const Icon = nav.icon
                        return <Link to={nav.path} className='flex justify-center items-center space-x-1' key={nav.id}>
                            <Icon size={20} />
                            <span className='font-medium text-lg'>{nav.name}</span>
                        </Link>
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar