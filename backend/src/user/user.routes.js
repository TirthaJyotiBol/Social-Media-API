import Express  from "express";
import UserController from "./user.controller.js";
import validate from "../../../middlewares/registerValidation.middleware.js";
import validateLogin from "../../../middlewares/login.validator.js";


const userRouter = Express.Router();


userRouter.get('/signup',UserController.renderRegister);
userRouter.get('/signin',UserController.renderLogin);
userRouter.post('/signup',[validate],UserController.addUser);
userRouter.post('/signin',[validateLogin],UserController.loginUser);



export default userRouter;