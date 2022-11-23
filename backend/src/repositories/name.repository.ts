import { Name } from '../models/Name.model';

import { IName } from '../types/interfaces/models';

import { getSSBnames } from '../utils/getSSBnames';

export const create = async (entry: IName) => {
  const newEntry = new Name(entry);
  return await newEntry.save();
};

export const find = async (query = {}) => {
  return await Name.find(query);
};

export const findOne = async () => {
  let femaleNames = await Name.findOne({ sex: 'female' });
  let maleNames = await Name.findOne({ sex: 'male' });

  let namesFromSSB;

  if (!femaleNames) {
    namesFromSSB = await getSSBnames();
    console.log(namesFromSSB);

    femaleNames = new Name({
      first_name: namesFromSSB.names.female.firstName,
      last_name: namesFromSSB.names.female.lastName,
      sex: 'female',
    });

    await femaleNames.save();
  }

  if (!maleNames) {
    namesFromSSB = await getSSBnames();

    maleNames = new Name({
      first_name: namesFromSSB.names.male.firstName,
      last_name: namesFromSSB.names.male.lastName,
      sex: 'male',
    });
  }

  return { femaleNames, maleNames };
};
