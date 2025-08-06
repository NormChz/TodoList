import { Router } from "express";
import { userController } from "../controller/userController.ts";
import { isAuthenticatedUser } from '../middleware/authentication.ts';

export const userRouter = Router();

userRouter.get('/', isAuthenticatedUser, userController.getAuthUser);

userRouter.post('/signup', userController.signupUser);

userRouter.post('/login', userController.loginUser);

userRouter.post('/logout', userController.logoutUser);