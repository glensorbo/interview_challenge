import mongoose from 'mongoose';

import { IChat } from '../types/interfaces/models';

const chatSchema = new mongoose.Schema<IChat>(
  {
    room: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    time: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
