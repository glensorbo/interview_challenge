import { useEffect, useState } from 'react';
import { useStateSelector } from './useRedux';

export const useRandomName = () => {
  const { female, male, loading } = useStateSelector((state) => state.names);

  const [sex, setSex] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 100);

    if (randomNumber >= 50) {
      setSex('female');
    } else {
      setSex('male');
    }

    if (!loading) {
      if (sex === 'female') {
        const firstNameIndex = Math.floor(
          Math.random() * female.firstName.length
        );
        const lastNameIndex = Math.floor(
          Math.random() * female.lastName.length
        );
        setFirstName(female.firstName[firstNameIndex]);
        setLastName(female.lastName[lastNameIndex]);
      }

      if (sex === 'male') {
        const firstNameIndex = Math.floor(
          Math.random() * male.firstName.length
        );
        const lastNameIndex = Math.floor(Math.random() * male.lastName.length);
        setFirstName(male.firstName[firstNameIndex]);
        setLastName(male.lastName[lastNameIndex]);
      }
    }
  }, [
    female.firstName,
    female.lastName,
    male.firstName,
    male.lastName,
    loading,
    sex,
  ]);

  const randomize = () => {
    setSex(sex === 'female' ? 'male' : 'female');
  };

  return { firstName, lastName, sex, randomize };
};
