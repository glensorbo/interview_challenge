import mongoose from 'mongoose';

import { IChat } from '../types/interfaces/models';

const chatSchema = new mongoose.Schema<IChat>(
  {
    room: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    time: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
