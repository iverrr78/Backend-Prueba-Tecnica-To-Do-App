import {taskRouter} from './task.router.js';
import { authRouter } from './auth.router.js';

// Function to set up routes
function Routes(Server){
    Server.use('/task', taskRouter);
    Server.use('/auth', authRouter);
}

export {Routes};