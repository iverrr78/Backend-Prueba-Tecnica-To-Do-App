import { Router } from 'express';
import { authController } from '../controllers/auth.controllers.js';
import { validationhandler } from '../middleware/validation.handler.js';
import { registerSchema, loginSchema } from '../dot/validator.js';

// Define auth routes
const routes = {
    Register: '/register',
    Login: '/login',
}

// Create router
const authRouter = Router();

// Register route
authRouter.post(routes.Register, validationhandler(registerSchema), (req,res)=>{
    authController.Register(req,res)
});
// Login route
authRouter.post(routes.Login, validationhandler(loginSchema), (req,res)=>{
    authController.Login(req,res)
});

export {authRouter};