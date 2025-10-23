import { Router } from 'express';
import { authenticateToken } from '../middleware/authentication.handler.js'
import { taskController } from '../controllers/task.controllers.js';
import { validationhandler } from '../middleware/validation.handler.js';
import { createTaskSchema, updateTaskSchema } from '../dot/validator.js';

// Define routes
const routes = {
    getTasks: '/',
    getTaskById: '/:id',
    createTask: '/create',
    updateTask: '/update/:id',
    deleteTask: '/delete/:id'
}

// Create router
const taskRouter = Router();

// Define routes
taskRouter.get(routes.getTasks, authenticateToken, (req, res) => {
    taskController.GetTasks(req,res);
});
taskRouter.get(routes.getTaskById, authenticateToken, (req, res) => {
    taskController.GetTaskById(req,res);
});
taskRouter.post(routes.createTask, authenticateToken, validationhandler(createTaskSchema), (req, res) => {
    taskController.CreateTask(req,res);
});
taskRouter.patch(routes.updateTask, authenticateToken, validationhandler(updateTaskSchema), (req, res) => {
    taskController.UpdateTask(req,res);
});
taskRouter.delete(routes.deleteTask, authenticateToken, (req, res) => {
    taskController.DeleteTask(req,res);
});

export {taskRouter};