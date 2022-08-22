import { IChat } from './../../types/interfaces/models/IChat.interface';
import { ChatRepository } from '../../repositories';

export const savePublicChat = async (chat: IChat, cb: (res: any) => void) => {
  try {
    if (chat.message === '') return;
    const newChatMessage = await ChatRepository.saveNewPublicChat(chat);

    cb(newChatMessage);
  } catch (error) {
    cb('Something went wrong');
  }
};
