import { Schema, models, model, Types } from 'mongoose';

export interface IPasswordEntry {
  userId: Types.ObjectId;
  label: string;
  username: string;
  passwordValue: string;
  url?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const passwordEntrySchema = new Schema<IPasswordEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    label: { type: String, required: true },
    username: { type: String, required: true },
    passwordValue: { type: String, required: true },
    url: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

export const PasswordEntry = models.PasswordEntry || model<IPasswordEntry>('PasswordEntry', passwordEntrySchema);

