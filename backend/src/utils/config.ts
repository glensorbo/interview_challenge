import dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
  HOST: string;
  PORT: string;
}

export const config: IConfig = {
  HOST: process.env.HOST!,
  PORT: process.env.PORT!,
};
