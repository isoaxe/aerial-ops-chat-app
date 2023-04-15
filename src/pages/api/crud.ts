import { ObjectId, Sort, SortDirection } from 'mongodb';
import clientPromise from '~/server/mongodb';
import { Message } from '~/utils/types';
import { NUM_MSGS } from '~/utils/constants';

export async function addMsg(text: string, imageUrl?: string) {
  try {
    const mongoClient = await clientPromise;
    const msgColl = mongoClient.db('chat-app').collection('messages');
    const date = new Date().toJSON();
    const unixTime = Date.parse(date);
    const msgDoc = { text, date, unixTime, imageUrl };
    await msgColl.insertOne(msgDoc);
    console.log('Message posted successfully.');
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMsg(id: string) {
  try {
    const mongoClient = await clientPromise;
    const msgColl = mongoClient.db('chat-app').collection('messages');
    const msgDoc = { _id: new ObjectId(id) };
    await msgColl.deleteOne(msgDoc);
    console.log('Message deleted!');
  } catch (error) {
    console.error(error);
  }
}

export async function listMsgs(
  sortType: string | null | undefined,
  isSortedAsc: boolean,
  cursor: string | null | undefined,
) {
  const order: SortDirection = isSortedAsc ? 1 : -1;
  const sort: Sort = sortType === 'date' ? { date: order } : { text: order };

  let nextPage = {};
  if (cursor) {
    const lastCursor = sortType === 'date' ? new ObjectId(cursor) : cursor;
    const sortOperator = isSortedAsc ? '$gt' : '$lt';
    const params = { [sortOperator]: lastCursor };
    nextPage = sortType === 'date' ? { _id: params } : { text: params };
  }

  let msgs: Message[];
  const mongoClient = await clientPromise;
  const msgColl = mongoClient.db('chat-app').collection('messages');
  msgs = (await msgColl
    .find(nextPage, { sort })
    .limit(NUM_MSGS)
    .toArray()) as Message[];

  console.log(`A batch of messages have been fetched.`);

  const lastItem = msgs[msgs.length - 1];
  let lastCursor: string | undefined;
  if (sortType === 'date') lastCursor = lastItem?._id.toString();
  else lastCursor = lastItem?._id.toString();
  return { msgs, lastCursor };
}
