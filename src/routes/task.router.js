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
taskRouter.get(routes.getTasks, (req, res) => {
    res.json({message: "getTasks"});
});
taskRouter.get(routes.getTaskById, (req, res) => {
    res.json({message: "getTaskById"});
});
taskRouter.post(routes.createTask, (req, res) => {
    res.json({message: "createTask"});
});
taskRouter.put(routes.updateTask, (req, res) => {
    res.json({message: "updateTask"});
});
taskRouter.delete(routes.deleteTask, (req, res) => {
    res.json({message: "deleteTask"});
});

export {taskRouter};