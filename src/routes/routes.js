import {taskRouter} from './task.routes.js';

function Routes(Server){
    Server.use('/task', taskRouter);
}

export {Routes};