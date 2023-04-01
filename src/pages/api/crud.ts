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
