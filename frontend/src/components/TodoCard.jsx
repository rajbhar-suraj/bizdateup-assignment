import { MdEdit, MdDelete } from "react-icons/md";

const TodoCard = ({ todo, onEdit, onDelete, onToggleStatus, setEditTodo, setEditing }) => {


  return (
    <div className=" flex justify-between items-center bg-zinc-900 border border-zinc-700 rounded-2xl p-3 w-full max-w-md sm:max-w-xl sm:min-w-xl md:min-w-2xl shadow-lg hover:shadow-xl transition-all duration-200 mt-2">
      <div className="flex flex-col gap-2 w-3/4">
        <div>
          <label className="text-xs text-zinc-500">Title</label>
          <p className="text-lg font-semibold text-white">{todo.title}</p>
        </div>

        <div>
          <label className="text-xs text-zinc-500">Description</label>
          <p className="text-zinc-300 text-sm">{todo.description}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <label className="text-xs text-zinc-500">Status</label>
        <button
          onClick={() => onToggleStatus(todo)}
          className={`text-white px-3 py-2 cursor-pointer rounded-full bg-amber-700 text-sm font-medium  hover:opacity-90`}
        >
          {todo.status}
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 text-white">
        <button onClick={() => {
          setEditTodo(todo)
          setEditing(true)
        }} className="cursor-pointer hover:text-gray-500">
          <MdEdit size={22} />
        </button>
        <button onClick={() => onDelete(todo.id)} className="cursor-pointer hover:text-gray-500">
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
