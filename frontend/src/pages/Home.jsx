import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard"
import useTodoStore from "../store/TodoStore"
import { BiTaskX } from "react-icons/bi";
import { FaFilter } from "react-icons/fa6";

const Home = () => {
  const { todos, getTodos, updateTodo, editTodoStatus, deleteTodo, isEditing, setEditing } = useTodoStore();
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
    status: ""
  })
  const [showfilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState("")
  const [filterTodos, setFilterTodos] = useState([])

  async function editHandler() {
    setEditing(true)
    await updateTodo(editTodo)
  }

  async function deleteHandler(id) {
    await deleteTodo(id)
  }

  async function statusHandler(todo) {
    console.log(todo.id)
    setFilterTodos([])
    setFilter("");
    setShowFilter(false)
    const updatedStatus =
      todo.status === "pending"
        ? "ongoing"
        : todo.status === "ongoing"
          ? "completed"
          : "pending";
    
    await editTodoStatus(todo.id, updatedStatus)
  }

  const todosWithFilteration = () => {
    setFilterTodos(todos.filter(todo =>
      todo.status === filter
    ))
    getTodos()
  }

  useEffect(() => {
    console.log("fdjds", filter)
    todosWithFilteration()
  }, [filter])

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh - 64px)] mt-10 space-y-2">
      {/* filtering */}
      <div className="relative mx-auto max-w-md  sm:min-w-xl md:min-w-2xl flex justify-end">
        {
          todos.length > 0 && !isEditing ? <button onClick={() => {
            setShowFilter(!showfilter);
            setFilter("")
            setFilterTodos([])

          }} className="flex justify-end bg-zinc-200 p-2 cursor-pointer">
            <FaFilter />

          </button> : null

        }
        {
          showfilter  && !isEditing && <div className="absolute right-10 ">
            <select
              // value={editTodo.status}
              onChange={(e) => setFilter(e.target.value)}
              className='w-full border border-gray-700 text-zinc-900 font-medium bg-zinc-100  p-2 rounded-md'
              required
            >

              <option value="">Select Status</option>
              <option value="pending">
                Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        }
      </div>

      {/* listing filtered todos */}
      {
        filterTodos.length > 0 && !isEditing && showfilter ? filterTodos?.map(todo => (
          <TodoCard key={`${todo.id}-${todo.created_at}`}
            todo={todo} onDelete={deleteHandler} onToggleStatus={statusHandler} setEditTodo={setEditTodo} setEditing={setEditing} />

        )) : !isEditing && !filterTodos.length  && <div className="flex justify-center items-center mt-11">
          <BiTaskX size={50} />
          <span className="font-medium text-xl">
            No todo's with current status
          </span>
        </div>
      }

      {/* listing todos */}
      {
        todos.length > 0 && !isEditing && filterTodos.length <= 0 ? todos?.map(todo => (
          <TodoCard key={`${todo.id}-${todo.created_at}`}
            todo={todo} onDelete={deleteHandler} onToggleStatus={statusHandler} setEditTodo={setEditTodo} setEditing={setEditing} />

        )) : !isEditing && !showfilter && <div className="flex justify-center items-center mt-11">
          <BiTaskX size={50} />
          <span className="font-medium text-xl">
            No todo's added yet
          </span>
        </div>
      }

      {/* editing feature */}
      {
        isEditing && <div className="flex justify-between items-center  bg-zinc-900 border border-zinc-700 rounded-2xl p-3 w-full max-w-sm sm:max-w-xl sm:min-w-xl md:min-w-2xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex flex-col gap-2 w-3/7">
            <div>
              <label className="text-xs text-zinc-500">Title</label>
              <input
                type="text"
                value={editTodo.title}
                onChange={(e) => setEditTodo((prev) => ({ ...prev, title: e.target.value }))}
                className=' w-full text-zinc-900 border border-gray-700 bg-zinc-100 font-semibold  p-2 rounded-md'
                required
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500">Description</label>
              <textarea
                type="text"
                value={editTodo.description}
                onChange={(e) => setEditTodo((prev) => ({ ...prev, description: e.target.value }))}
                className='w-full  min-h-12 max-h-25 border border-gray-700 text-zinc-900 font-medium bg-zinc-100  p-2 rounded-md'
                required
              />
            </div>
          </div>

          <div className="flex flex-col justify-between items-center gap-10 w-3/7 sticky-9">
            <div className="w-full">
              <label className="text-xs text-zinc-500">Status</label>
              <select
                value={editTodo.status}
                onChange={(e) => setEditTodo((prev) => ({ ...prev, status: e.target.value }))}
                className='w-full border border-gray-700 text-zinc-900 font-medium bg-zinc-100  p-2 rounded-md'
                required
              >

                <option value="">Select Status</option>
                <option value="pending">
                  Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>

            </div>
            <div className="flex text-white w-full">
              <button onClick={editHandler} className="w-full cursor-pointer bg-amber-800 rounded-md p-2 hover:text-gray-500">
                Save
              </button>

            </div>
          </div>
        </div>

      }
    </div>
  )
}

export default Home