import { IChat } from './../types/interfaces/models/IChat.interface';
import { Chat } from '../models/Chat.model';

export const getPublicChat = async () => {
  return await Chat.find({ room: 'public' }).sort({ createdAt: 1 }).limit(10);
};

export const saveNewPublicChat = async (chat: IChat) => {
  const newChat = new Chat(chat);
  return await newChat.save();
};
