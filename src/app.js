import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import usersRoutes from './users/users.routes';
const app = express();

app.set('pkg', pkg);

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/users', usersRoutes);

export default app;
