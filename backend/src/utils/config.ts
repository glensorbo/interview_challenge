import dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
  HOST: string;
  PORT: string;
  MONGO_USER: string;
  MONGO_PW: string;
  MONGO_DBNAME: string;
  MONGO_IP: string;
}

export const config: IConfig = {
  HOST: process.env.HOST!,
  PORT: process.env.PORT!,
  MONGO_USER: process.env.MONGO_USER!,
  MONGO_PW: process.env.MONGO_PW!,
  MONGO_DBNAME: process.env.MONGO_DBNAME!,
  MONGO_IP: process.env.MONGO_IP!,
};
