import { RequestHandler } from 'express';
import { ChatRepository } from '../../repositories';

import { InternalServerErrorException } from './../../exceptions';

export const getCommonchat: RequestHandler = async (req, res, next) => {
  try {
    const commonChat = await ChatRepository.getCommonChat();

    res.json(commonChat);
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
