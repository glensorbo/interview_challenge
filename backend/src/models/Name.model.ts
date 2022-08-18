import mongoose from 'mongoose';

import { IName } from '../types/interfaces/models';

const nameSchema = new mongoose.Schema<IName>(
  {
    sex: { type: String, required: true, trim: true },
    first_name: [{ type: String, required: true, trim: true }],
    last_name: [{ type: String, required: true, trim: true }],
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
  }
);

export const NameModel = mongoose.model<IName>('Name', nameSchema);
