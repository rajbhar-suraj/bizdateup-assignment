const { addTodos, getTodos, editTodos, removeTodos, editTodoStatus } = require('../controllers/todos.controller')

const router = require('express').Router()

router.post('/', addTodos)
router.get('/', getTodos)
router.patch('/:id', editTodos)
router.patch("/status/:id",editTodoStatus)
router.delete('/:id', removeTodos)

module.exports = router