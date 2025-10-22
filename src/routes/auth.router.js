import { Router } from 'express';
import { authController } from '../controllers/auth.controllers.js';

const routes = {
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
}

const authRouter = Router();

authRouter.post(routes.Register, (req,res)=>{
    authController.Register(req,res)
});
authRouter.post(routes.Login, (req,res)=>{
    authController.Login(req,res)
});
authRouter.post(routes.Logout, (req,res)=>{
    res.json({message: "Logout"})
});
authRouter.delete('/:id', (req, res) => {
    authController.deleteUser(req, res);
});

export {authRouter};