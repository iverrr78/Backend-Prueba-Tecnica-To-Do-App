import { Router } from 'express';
import { authController } from '../controllers/auth.controllers.js';
import { validationhandler } from '../middleware/validation.handler.js';
import { registerSchema, loginSchema } from '../dot/validator.js';
const routes = {
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
}

const authRouter = Router();

authRouter.post(routes.Register, validationhandler(registerSchema), (req,res)=>{
    authController.Register(req,res)
});
authRouter.post(routes.Login, validationhandler(loginSchema), (req,res)=>{
    authController.Login(req,res)
});
authRouter.delete('/:id', (req, res) => {
    authController.deleteUser(req, res);
});

export {authRouter};