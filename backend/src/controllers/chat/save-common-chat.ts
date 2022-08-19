import { IChat } from './../../types/interfaces/models/IChat.interface';
import { ChatRepository } from '../../repositories';

export const saveCommonchat = async (chat: IChat, cb: (res: any) => void) => {
  try {
    const newChatMessage = await ChatRepository.saveNewCommonChat(chat);

    cb(newChatMessage);
  } catch (error) {
    cb('Something went wrong');
  }
};
