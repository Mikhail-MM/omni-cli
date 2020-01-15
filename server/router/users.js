import { Router } from 'express';
import { registerNewUser } from '../middleware/user-registration';
import { validateUserLogin } from '../middleware/authentication';
const usersRouter = Router();

usersRouter.post('/register', registerNewUser);
usersRouter.post('/login', validateUserLogin);

export {
  usersRouter
}