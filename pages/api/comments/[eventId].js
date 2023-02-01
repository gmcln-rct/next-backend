import { MongoClient } from 'mongodb';

import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {

    const { eventId } = req.query.eventId;

    let client;

    try {
       client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to db epic failed.' });
    }

    if (req.method === 'POST') {

      const { email, name, text } = req.body;

      if (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input. You are a failure' });
        return;
      }
      console.log(email, name, text);

      const newComment = {
        email,
        name,
        text,
        eventId
      };

      const db = client.db();

      const result = await db.collection('comments').insertOne(newComment);

      console.log("Result " + result);

      res.status(201).json({ message: 'Added your silly comment', comment: newComment });
    }

      if (req.method === 'GET') {
        const db = client.db();

        const documents = await db
          .collection('comments')
          .find().sort({ _id: -1})
          .toArray();


      res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;