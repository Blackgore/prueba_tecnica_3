import app from './app';
import dbConnection from './db';
import {connection} from './db.mock';
require('dotenv').config();
if (process.env.NODE_ENV === 'test') {
  connection();
} else {
  dbConnection();
}


app.listen(3000);
console.log('http://localhost:3000');
export default app;
