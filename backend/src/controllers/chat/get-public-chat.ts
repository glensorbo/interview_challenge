import { RequestHandler } from 'express';
import { ChatRepository } from '../../repositories';

import { InternalServerErrorException } from './../../exceptions';

export const getPublicChat: RequestHandler = async (req, res, next) => {
  try {
    const publicChat = await ChatRepository.getPublicChat();

    console.log(publicChat);
    res.json(publicChat);
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
