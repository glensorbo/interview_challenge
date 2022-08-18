import { RequestHandler } from 'express';

import { getSSBnames } from '../../utils/getSSBnames';

import { InternalServerErrorException } from './../../exceptions';

export const getAllNames: RequestHandler = async (req, res, next) => {
  try {
    //* Ask DB for names if lastYearInList === (new Date().getFullYear() -1)
    //* If lastYearInList === (new Date().getFullYear() -2) fetch new list from SSB and pray to god they haven't restructured the list

    const { names } = await getSSBnames();
    res.json(names.all);
  } catch (error) {
    next(new InternalServerErrorException());
  }
};
