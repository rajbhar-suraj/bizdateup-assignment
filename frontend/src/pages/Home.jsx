import { useEffect } from "react";
import TodoCard from "../components/TodoCard"
import useTodoStore from "../store/TodoStore"

const Home = () => {
  const { todos, getTodos, editTodoStatus } = useTodoStore();

  function editHandler() {

  }

  function deleteHandler() {

  }

  async function statusHandler(todo) {
    console.log(todo.id)
    const updatedStatus =
      todo.status === "pending"
        ? "ongoing"
        : todo.status === "ongoing"
          ? "completed"
          : "pending";

    await editTodoStatus(todo.id, updatedStatus)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh - 64px)] mt-10 space-y-2">
      {
        todos?.map(todo => (
          <TodoCard key={`${todo.id}-${todo.created_at}`}
            todo={todo} onDelete={deleteHandler} onEdit={editHandler} onToggleStatus={statusHandler} />

        ))
      }
    </div>
  )
}

export default Home