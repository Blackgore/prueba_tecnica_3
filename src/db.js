import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect('mongodb://mongo/PruebaTecnica', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB Online');
    } else {
      await mongoose.connect('mongodb://localhost:27017/PruebaTecnica', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB Online');
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }
};
export default dbConnection;

