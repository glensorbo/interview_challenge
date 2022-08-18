import axios from 'axios';

export const getSSBnames = async () => {
  const names = {
    all: {
      firstName: [] as string[],
      lastName: [] as string[],
    },
    female: {
      firstName: [] as string[],
      lastName: [] as string[],
    },
    male: {
      firstName: [] as string[],
      lastName: [] as string[],
    },
  };

  const { data } = await axios.get('https://data.ssb.no/api/v0/no/table/10467');

  const encryptedNames: string[] = data.variables[0].values;
  const typedNames: string[] = data.variables[0].valueTexts;

  let index = 0;
  for (let i = 0; encryptedNames.length > i; i++) {
    if (encryptedNames[i].startsWith('2')) {
      index = i;
      break;
    }
  }

  names.all.firstName = typedNames;
  names.female.firstName = typedNames.slice(0, index);
  names.male.firstName = typedNames.slice(index, typedNames.length);

  const femaleLastNames = names.female.firstName.map((name: string) => {
    return name + 'dottir';
  });

  const maleLastNames = names.male.firstName.map((name: string) => {
    return name + 'sen';
  });

  names.all.lastName = [...femaleLastNames, ...maleLastNames];
  names.female.lastName = femaleLastNames;
  names.male.lastName = maleLastNames;

  const lastYearInList = data.variables[2].values.at(-1);

  return { names, lastYearInList };
};
