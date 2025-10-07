const pool = require('../utils/db');

const getAllTodos = async () => {
    try {
        const todos = await pool.query('select * from todos')
        return todos.rows;
    } catch (error) {
        console.log("Error while getting todos from db: ", error)
    }
}

const createTodos = async (title, description, status) => {
    try {
        const result = await pool.query("insert into todos(title, description, status) values($1,$2,$3) returning *",
            [title, description, status])
        return result.rows[0]
    } catch (error) {
        console.log("Error while getting todos in db: ", error)
    }
}

const deleteTodos = async (id) => {
    try {
        const result = await pool.query("delete from todos where id = $1 returning *", [id])

        return result.rows
    } catch (error) {
        console.log("Error while deleting todos in db: ", error)
    }
}

const updateTodos = async (id, title, description, status) => {
    try {
        const result = await pool.query("update todos set title=$1, description=$2, status=$3 where id=$4 returning *",
            [title, description, status, id]
        )
        return result.rows
    } catch (error) {
        console.log("Error while updating todos in db: ", error)
    }
}

const updateStatus = async (id, status) => {
    try {
        const result = await pool.query("update todos set status=$1 where id=$2 returning *",
            [status, id]
        )
        return result.rows
    } catch (error) {
        console.log("Error while updating the status in db: ", error)
    }
}

module.exports = {
    getAllTodos,
    createTodos,
    updateTodos,
    updateStatus,
    deleteTodos
}