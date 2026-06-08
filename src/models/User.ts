import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  password?: string;
  role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
