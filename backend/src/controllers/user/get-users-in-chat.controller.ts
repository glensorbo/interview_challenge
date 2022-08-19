import { RequestHandler } from 'express';
import { UserRepository } from '../../repositories';

import { InternalServerErrorException } from './../../exceptions';

export const getUsersInChat: RequestHandler = async (req, res, next) => {
  try {
    const usersInChat = await UserRepository.getAll();

    res.json(usersInChat);
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
