import { Message } from '~/utils/types';
import clientPromise from '../../server/mongodb';

export async function addMsg(text: string) {
  try {
    const mongoClient = await clientPromise;
    const msgColl = mongoClient.db('chat-app').collection('messages');
    const date = new Date().toJSON();
    const unixTime = Date.parse(date);
    const msgDoc = { text, date, unixTime };
    await msgColl.insertOne(msgDoc);
    console.log('Message posted successfully.');
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMsg(timeStamp: number) {
  try {
    const mongoClient = await clientPromise;
    const msgColl = mongoClient.db('chat-app').collection('messages');
    const msgDoc = { unixTime: timeStamp };
    await msgColl.deleteOne(msgDoc);
    console.log('Message deleted!');
  } catch (error) {
    console.error(error);
  }
}

export async function listMsgs() {
  try {
    const mongoClient = await clientPromise;
    const msgColl = mongoClient.db('chat-app').collection('messages');
    const allMsgs = (await msgColl.find({}).toArray()) as Message[];
    console.log('All messages have been fetched.');
    return allMsgs;
  } catch (error) {
    console.error(error);
  }
}
