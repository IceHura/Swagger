import express from "express"
import { createTodo, getAllFalses, getAllFromUser, getAllTodos, modifyTodo } from "../controllers/TodoController";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";

const router = express.Router()

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: "Finish the project"
 *     responses:
 *       201:
 *         description: Todo successfully created
 *       400:
 *         description: Validation error
 */
router.post('/', verifyTokenMiddleware, createTodo)

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all todos
 */
router.get('/', verifyTokenMiddleware, getAllTodos)

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo as completed
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to update
 *     responses:
 *       200:
 *         description: Todo successfully updated
 *       404:
 *         description: Todo not found
 */
router.put('/:id', verifyTokenMiddleware, modifyTodo)

/**
 * @swagger
 * /todos/false:
 *   get:
 *     summary: Get all incomplete todos
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all incomplete tasks
 */
router.get('/false', verifyTokenMiddleware, getAllFalses);

/**
 * @swagger
 * /todos/fromUser:
 *   get:
 *     summary: Get all todos from a specific user
 *     tags:
 *       - Todos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tasks assigned to the user
 */
router.get('/fromUser', verifyTokenMiddleware, getAllFromUser);

export default router;