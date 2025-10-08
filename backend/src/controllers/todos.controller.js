const { getAllTodos, createTodos, updateTodos, updateStatus, deleteTodos } = require("../models/todos.model");


const getTodos = async (req, res) => {
    try {
        const result = await getAllTodos();
        return res.status(200).json({ message: 'Todos fetched', result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addTodos = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        if (!title || !description || !status) return res.status(400).json({ message: 'Fields are missing' })
        const result = await createTodos(title, description, status)
        return res.status(200).json({ message: 'Todo created successfully', result, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const editTodos = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const id = req.params.id;

        if (!title || !description || !status || !id) return res.status(400).json({ message: 'Fields are missing' })

        const result = await updateTodos(id, title, description, status);
        return res.status(200).json({ message: 'Todo updated successfully', result, success: true })
    } catch (error) {
        return res.status(500).json({ message: '"Internal server error"' })
    }
}

const editTodoStatus = async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    try {
        if (!status || !id) return res.status(400).json({ message: 'Fields are missing' })
        const result = await updateStatus(id, status)
        const updated = result[0]
        return res.status(200).json({ message: 'Todo status updated', updated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const removeTodos = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) return res.status(400).json({ message: 'Fields are missing' })
        const result = await deleteTodos(id)
        return res.status(200).json({ message: 'Todo deleted successfully', result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addTodos,
    getTodos,
    editTodos,
    editTodoStatus,
    removeTodos
}