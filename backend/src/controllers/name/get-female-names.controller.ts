import { RequestHandler } from 'express';
import { NameRepository } from '../../repositories';
import { InternalServerErrorException } from './../../exceptions/internal-server-error.exception';

export const getFemaleNames: RequestHandler = async (req, res, next) => {
  try {
    //* Ask DB for names if lastYearInList === (new Date().getFullYear() -1)
    //* If lastYearInList === (new Date().getFullYear() -2) fetch new list from SSB and pray to god they haven't restructured the list

    const { femaleNames } = await NameRepository.findOne();

    res.json({ femaleNames });
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
