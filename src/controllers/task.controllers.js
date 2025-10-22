import {Task} from '../models/asociations.js';

async function CreateTask(req,res){
    res,status(201).json({message: "Task created successfully"});
}

async function GetTasks(req,res){
    res.status(200).json({message: "Tasks retrieved successfully"});
}

async function GetTaskById(req,res){
    res.status(200).json({message: "Task retrieved successfully"});
}

async function UpdateTask(req,res){
    res.status(200).json({message: "Task updated successfully"});
}

async function DeleteTask(req,res){
    res.status(200).json({message: "Task deleted successfully"});
}

const taskController = {
    CreateTask: CreateTask,
    GetTasks: GetTasks,
    GetTaskById: GetTaskById,
    UpdateTask: UpdateTask,
    DeleteTask: DeleteTask
}

export {taskController}