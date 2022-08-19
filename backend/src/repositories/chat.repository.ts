import { IChat } from './../types/interfaces/models/IChat.interface';
import { Chat } from '../models/Chat.model';

export const getCommonChat = async () => {
  return await Chat.find({ room: 'common' }).sort({ createdAt: 1 });
};

export const saveNewCommonChat = async (chat: IChat) => {
  const newChat = new Chat(chat);
  return await newChat.save();
};
