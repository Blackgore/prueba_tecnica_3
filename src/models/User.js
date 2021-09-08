import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
}, {
  timestamps: true,
  versionKey: false,
});

export default model('User', userSchema);
