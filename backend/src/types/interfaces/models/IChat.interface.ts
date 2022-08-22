import { Types } from 'mongoose';

export interface IChat {
  _id?: Types.ObjectId;
  room: string;
  name: string;
  message: string;
  avatar: string;
  time: string;
}
