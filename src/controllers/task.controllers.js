import {Task} from '../models/asociations.js';

// Controller to create a new task
async function CreateTask(req,res){
    const {title, description} = req.body;
    const userId = req.user.id;

    try{
        const task = await Task.create({
        title: title,
        description: description,
        completed: false,
        userId: userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task: task
        });
    } catch(err) {
        console.log("error:", err.message);
        return res.status(500).json({message: err.message });
    }
}

// Controller to get all tasks for the authenticated user
async function GetTasks(req,res){
    const userId = req.user.id;

    try {
        const tasks = await Task.findAll({ where: { UserId: userId } });
        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks: tasks
        });
    } catch(err) {
        console.log("error:", err.message);
        return res.status(500).json({message: err.message });
    }
}

// Controller to update a task's status to completed
async function UpdateTask(req,res){
    const {id} = req.params;

    try{
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        await task.update({
            completed: true
        });

        res.status(200).json({message: "Task updated successfully"});
    } catch(err){
        console.log("error:", err.message);
        return res.status(500).json({message: err.message });
    }    
}

// Controller to delete a task
async function DeleteTask(req,res){
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try{
        await Task.destroy({ where: { id: id } });
        res.status(200).json({message: "Task deleted successfully"});
    } catch(err){
        console.log("error:", err.message);
        return res.status(500).json({message: err.message });
    }
}

const taskController = {
    CreateTask: CreateTask,
    GetTasks: GetTasks,
    UpdateTask: UpdateTask,
    DeleteTask: DeleteTask
}

export {taskController}