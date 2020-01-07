import { Router } from 'express';
import { registerNewUser } from '../middleware/user-registration';
const usersRouter = Router();

const registerMongooseUserPathways = (app) => {
  usersRouter.post('/register', registerNewUser);
  app.use('/', usersRouter);
}

export {
  registerMongooseUserPathways
}