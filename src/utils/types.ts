import { ObjectId } from 'mongodb';

export type Message = {
  _id: ObjectId;
  text: string;
  date: string;
  unixTime: number;
};
