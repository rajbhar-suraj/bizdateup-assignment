import { useState } from 'react'
import { navbarControls } from '../constants'
import { Link } from 'react-router-dom'
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className='flex justify-between items-center p-3 bg-gray-100 shadow-md'>
            <Link to="/" className='font-medium text-xl pl-10'>
                Todos
            </Link>
            <div className='hidden md:flex gap-10 pr-10'>
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
            <button
                className="md:hidden text-gray-700 pr-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
            </button>

            {
                isOpen &&
                <div>
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
            }
        </nav>
    )
}

export default Navbar