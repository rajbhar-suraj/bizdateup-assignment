const { addTodos, getTodos, editTodos, removeTodos, editTodoStatus } = require('../controllers/todos.controller')

const router = require('express').Router()

router.post('/', addTodos)
router.get('/', getTodos)
router.put('/:id', editTodos)
router.patch("/:id",editTodoStatus)
router.delete('/:id', removeTodos)

module.exports = router