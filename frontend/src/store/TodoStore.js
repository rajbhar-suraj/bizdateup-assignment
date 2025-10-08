import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = "https://my-backend.onrender.com/api" || "http://localhost:5000/api";

const useTodoStore = create((set, get) => ({
    todos: [],
    isCreating: false,
    isLoadingTodos: false,
    isEditing: false,

    setEditing: (data) => set({ isEditing: data }),
    createTodo: async (data) => {
        set({ isCreating: true })
        try {
            const response = await axios.post(`${api}/`, data);
            const currentTodos = get().todos
            set({ todos: [...currentTodos, response.data.result] })
            toast.success(response.data.message)

            return response
        } catch (error) {
            console.log("Error while creating the todo", error)
        } finally {
            set({ isCreating: false })
        }
    },

    getTodos: async () => {
        set({ isLoadingTodos: true })
        try {
            const response = await axios.get(`${api}/`);
            set({ todos: response.data.result })
        } catch (error) {
            console.log("Error while getting the todos", error)

        } finally {
            set({ isLoadingTodos: false })
        }
    },

    editTodoStatus: async (id, status) => {
        try {
            const response = await axios.patch(`${api}/status/${id}`, { status })
            const updatedTodo = response.data.updated;
            const currentTodos = get().todos
            const newTodos = currentTodos.map((todo) =>
                todo.id === id ? updatedTodo : todo
            )
            set({ todos: newTodos })
        } catch (error) {
            console.log("Error while editing the status", error)
        }
    },

    updateTodo: async (data) => {
        set({ isEditing: true })
        try {
            const response = await axios.patch(`${api}/${data.id}`, data)
            const currentTodos = get().todos;

            const newTodos = currentTodos.map(todo =>
                todo.id === data.id ? response.data.updated : todo
            )

            set({ todos: newTodos });
            toast.success(response.data.message)
        } catch (error) {
            console.log("Error while editing the todo", error)

        } finally {
            set({ isEditing: false })
        }
    },

    deleteTodo: async (id) => {
        try {
            const response = await axios.delete(`${api}/${id}`);

            const currentTodos = get().todos;

            const newTodos = currentTodos.filter(todo => todo.id !== id)
            set({ todos: newTodos });
            toast.success(response.data.message)
        } catch (error) {
            console.log("Error while deleting the todo: ", error)
        }
    }
}))

export default useTodoStore