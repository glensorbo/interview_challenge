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
    femaleNames!.first_name = namesFromSSB.names.female.firstName;
    femaleNames!.last_name = namesFromSSB.names.female.lastName;
    await femaleNames!.save();
  }

  if (!maleNames) {
    namesFromSSB = await getSSBnames();
    maleNames!.first_name = namesFromSSB.names.male.firstName;
    maleNames!.last_name = namesFromSSB.names.male.lastName;
    await maleNames!.save();
  }

  return { femaleNames, maleNames };

  // let names = await Name.findOne({ sex });

  // let namesFromSSB;

  // const femaleNames = {
  //   first_name: [] as string[],
  //   last_name: [] as string[],
  // };
  // const maleNames = {
  //   first_name: [] as string[],
  //   last_name: [] as string[],
  // };
  // const kombinedNames = {
  //   first_name: [] as string[],
  //   last_name: [] as string[],
  // };

  // if (!names) {
  //   namesFromSSB = await getSSBnames();

  //   femaleNames.first_name = namesFromSSB.names.female.firstName;
  //   femaleNames.last_name = namesFromSSB.names.female.lastName;

  //   maleNames.first_name = namesFromSSB.names.male.firstName;
  //   maleNames.last_name = namesFromSSB.names.male.lastName;

  //   kombinedNames.first_name = namesFromSSB.names.all.firstName;
  //   kombinedNames.last_name = namesFromSSB.names.all.lastName;
  // }

  // if (!names && sex === 'kombined') {
  //   await create({
  //     sex: 'female',
  //     first_name: femaleNames.first_name,
  //     last_name: femaleNames.last_name,
  //   });
  //   await create({
  //     sex: 'male',
  //     first_name: maleNames.first_name,
  //     last_name: maleNames.last_name,
  //   });
  //   names = await create({
  //     sex: 'kombined',
  //     first_name: kombinedNames.first_name,
  //     last_name: kombinedNames.last_name,
  //   });
  // }

  // if (!names && sex !== 'kombined') {
  //   names = await create({
  //     sex,
  //     first_name: sex === 'female' ? femaleNames.first_name : maleNames.first_name,
  //     last_name: sex === 'female' ? femaleNames.last_name : maleNames.last_name,
  //   });
  // }

  // return names;
};
