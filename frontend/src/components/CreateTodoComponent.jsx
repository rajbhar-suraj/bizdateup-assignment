import { useState } from 'react'
import { MdDescription } from "react-icons/md";
import { MdOutlineTitle } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import useTodoStore from '../store/TodoStore';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const CreateTodoComponent = () => {
    const navigate = useNavigate()
    const { createTodo, isCreating } = useTodoStore()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: ""
    })

    async function todoHandler(e) {
        e.preventDefault()
        const response = await createTodo(formData)
        if (response.data.success) {
            setFormData({
                title: "",
                description: "",
                status: ""
            })
            navigate("/")
        }
    }

    return (
        <form onSubmit={todoHandler} className='flex flex-col justify-center items-center rounded-2xl w-full max-w-md p-10 mb-10 bg-gray-200 shadow-md'>
            <div className='relative flex flex-col w-full'>
                <label className='text-gray-700 text-sm'>Title</label>
                <input
                    type=""
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="routine"
                    className=' w-full text-zinc-900 border border-gray-700 bg-zinc-100 font-semibold pl-9 p-2 rounded-md'
                    required
                />
                <MdOutlineTitle className='absolute top-8 left-2 size-5 ' />
            </div>

            <div className='relative flex flex-col w-full mt-3'>
                <label className='text-gray-700 text-sm'>Description</label>
                <textarea
                    type=""
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="start your day by creating your daily routine..."
                    className='w-full  min-h-15 max-h-50 border border-gray-700 text-zinc-900 font-medium bg-zinc-100 pl-10 p-2 rounded-md'
                    required
                />
                <MdDescription className='absolute top-8 left-3 size-5' />
            </div>

            <div className='relative flex flex-col w-full mt-3'>
                <label className='text-gray-700 text-sm'>Status</label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className='w-full border border-gray-700 text-zinc-900 font-medium bg-zinc-100 pl-10 p-2 rounded-md'
                    required
                >

                    <option value="">Select Status</option>
                    <option value="pending">
                        Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                </select>
                <BsBarChartFill className='absolute top-8 left-3 size-4' />
            </div>
            <button
                type="submit"
                className='w-full cursor-pointer bg-zinc-900 mt-3 text-white rounded-md p-2 hover:bg-zinc-800'>
                {isCreating ? <span className='flex justify-center items-center gap-2'><Loader /> Creating</span> : "Create"}
            </button>
        </form>
    )
}

export default CreateTodoComponent