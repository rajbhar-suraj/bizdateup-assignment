import React from 'react'
import CreateTodoComponent from '../components/CreateTodoComponent'

const CreateTodos = () => {
  
  return (
    <div className='h-[calc(100vh-60px)] flex flex-col justify-center items-center w-full'>
      <span className='font-medium text-2xl'>Start your day</span>
      <CreateTodoComponent />
        <div className='mt-10'>
        </div>
    </div>
  )
}

export default CreateTodos