import { ObjectId } from 'mongodb';

export type Message = {
  _id: ObjectId;
  text: string;
  date: string;
  unixTime: number;
  imageUrl?: string;
};

export type MessagesProps = {
  msgs: Message[];
  refetch: () => void;
};

export type MessageBarProps = {
  refetch: () => void;
};
