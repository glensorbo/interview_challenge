import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    socket_id: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);

export const User = mongoose.model('User', userSchema);
