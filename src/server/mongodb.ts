import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? 'FAILED';
if (uri === 'FAILED') console.error('MongoDB URI not found.');

let mongoClient;
let clientPromise: Promise<MongoClient>;

try {
  mongoClient = new MongoClient(uri, {});
  clientPromise = mongoClient.connect();
  console.log('Now connected to MongoDB Atlas!');
} catch (error) {
  console.error('Connection to MongoDB Atlas failed!', error);
  process.exit();
}

export default clientPromise;
