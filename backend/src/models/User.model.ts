import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    socket_id: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    status: { type: String, default: 'New arrival', trim: true },
    joined: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);

export const User = mongoose.model('User', userSchema);
