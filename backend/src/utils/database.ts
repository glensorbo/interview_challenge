import mongoose from 'mongoose';

import { config } from './config';

import { InternalServerErrorException } from '../exceptions';

const dbUser = config.MONGO_USER;
const dbPW = config.MONGO_PW;
const dbIP = config.MONGO_IP;
const dbName = config.MONGO_DBNAME;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${dbUser}:${dbPW}@${dbIP}/${dbName}`);
    console.log(`MongoDB connected. - `);
    console.log(`User: '${dbUser}' @ '${dbIP}' - DB: '${dbName}'`);
  } catch (error) {
    console.error(new InternalServerErrorException('Connection to DB failed, exiting...'));
    process.exit(1);
  }
};
