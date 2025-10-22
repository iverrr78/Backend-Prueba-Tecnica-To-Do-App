import { Router } from 'express';

// Define routes
const routes = {
    getTasks: '/',
    getTaskById: '/:id',
    createTask: '/',
    updateTask: '/:id',
    deleteTask: '/:id'
}

// Create router
const taskRouter = Router();

// Define routes
taskRouter.get(routes.getTasks, {message: "getTasks"});
taskRouter.get(routes.getTaskById, {message: "getTaskById"});
taskRouter.post(routes.createTask, {message: "createTask"});
taskRouter.put(routes.updateTask, {message: "updateTask"});
taskRouter.delete(routes.deleteTask, {message: "deleteTask"});

export {taskRouter};