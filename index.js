 import express from 'express';

 import mongoose from 'mongoose';

 import {registerValidation} from './validations/auth.js';

 import checkAuth from './utils/checkAuth.js';

 import * as UserController from './controllers/UserController.js';
 import * as PostController from './controllers/PostController.js'
import { postCreateValidation } from './validations/post.js';

 mongoose.connect(
  'mongodb+srv://h0ldmelol:123123qwe@cluster0.vhfskbg.mongodb.net/blog?retryWrites=true&w=majority'
  ).then(() =>
    console.log('connected to db')
  ).catch((err) => console.log('db error', err));

 const app = express();

 app.use(express.json());

 app.post('/auth/login', UserController.login)
 app.post('/auth/register', registerValidation, UserController.register);
 app.get('/auth/me', checkAuth, UserController.getMe);

 app.get('/posts', PostController.getAll);
 app.get('/posts/:id', PostController.getOne);
 app.post('/posts', checkAuth, postCreateValidation, PostController.create);
 app.delete('/posts/:id', checkAuth, PostController.remove);
 app.patch('/posts/:id', checkAuth, PostController.update);

 app.listen(4444, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK');
 })

 