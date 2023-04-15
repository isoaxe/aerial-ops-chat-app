import { Dispatch, SetStateAction } from 'react';
import { ObjectId } from 'mongodb';

export type Message = {
  _id: ObjectId;
  text: string;
  date: string;
  unixTime: number;
  imageUrl?: string;
};

export type MessagesProps = {
  allMsgs: Message[];
  isFetchingNextPage: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
};

export type MessageBarProps = {
  refetch: () => void;
};

export type SortBarProps = {
  sortType: string | null;
  isSortedAsc: boolean;
  setSortType: Dispatch<SetStateAction<string | null>>;
  setIsSortedAsc: Dispatch<SetStateAction<boolean>>;
};
