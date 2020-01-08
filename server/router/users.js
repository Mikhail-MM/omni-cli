import { Router } from 'express';
import { registerNewUser } from '../middleware/user-registration';

const usersRouter = Router();

usersRouter.post('/register', registerNewUser);

export {
  usersRouter
}