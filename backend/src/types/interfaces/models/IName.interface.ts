import { Types } from 'mongoose';

export interface IName {
  _id?: Types.ObjectId;
  sex: string;
  first_name: string[];
  last_name: string[];
}
