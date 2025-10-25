import { Router } from 'express';
import { authenticateToken } from '../middleware/authentication.handler.js'
import { taskController } from '../controllers/task.controllers.js';
import { validateid, validationhandler } from '../middleware/validation.handler.js';
import { createTaskSchema, singleid } from '../dot/validator.js';

// Define routes
const routes = {
    getTasks: '/',
    createTask: '/create',
    updateTask: '/update/:id',
    deleteTask: '/delete/:id'
}

// Create router
const taskRouter = Router();

// Get tasks route
taskRouter.get(routes.getTasks, authenticateToken, (req, res) => {
    taskController.GetTasks(req,res);
});

// Create task route
taskRouter.post(routes.createTask, authenticateToken, validationhandler(createTaskSchema), (req, res) => {
    taskController.CreateTask(req,res);
});

// Route to change task status to completed
taskRouter.patch(routes.updateTask, authenticateToken, validateid(singleid), (req, res) => {
    taskController.UpdateTask(req,res);
});

// Delete task route
taskRouter.delete(routes.deleteTask, authenticateToken, validateid(singleid), (req, res) => {
    taskController.DeleteTask(req,res);
});

export {taskRouter};