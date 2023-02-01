import { MongoClient } from 'mongodb';

import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {

    const { eventId } = req.query.eventId;

    let client;

    try {
       client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'ARGH: Connecting to db epic failed.' });
      return
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

      let result;

      try {
        result = await insertDocument(client, 'comments', newComment);
      } catch (error) {
        res.status(500).json({ message: 'ARGH: Inserting COMMENT failed.' });
        return;
      }

      newComment._id = result.insertedId;

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