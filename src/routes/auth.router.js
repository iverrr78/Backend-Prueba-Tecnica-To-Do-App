import {Router} from 'express';

const routes = {
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
}

const authRouter = Router();

authRouter.post(routes.Register, {message: "Register"});
authRouter.post(routes.Login, {message: "Login"});
authRouter.post(routes.Logout, {message: "Logout"});

export {authRouter};