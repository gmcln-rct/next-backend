import { MongoClient } from 'mongodb';

export async function connectDatabase () {
    const client = await MongoClient.connect(
      'mongodb+srv://newsletteruser:S6iHou7gpgVhOS2k@cluster2.q5n56ip.mongodb.net/?retryWrites=true&w=majority'
    );
  
    return client;
  }
  
 export  async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);
  
    return result;
  }

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();

    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();

      return documents;
}
    