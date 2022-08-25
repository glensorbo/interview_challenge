import { RequestHandler } from 'express';
import { ChatRepository } from '../../repositories';

import { InternalServerErrorException } from './../../exceptions';

export const getPublicChat: RequestHandler = async (req, res, next) => {
  try {
    const publicChat = await ChatRepository.getPublicChat();

    const lastTenChats = publicChat.slice(publicChat.length - 10, -1);

    res.json(lastTenChats);
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
