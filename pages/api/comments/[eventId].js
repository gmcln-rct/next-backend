import { Db, MongoClient } from 'mongodb';

async function handler(req, res) {

    const { eventId } = req.query.eventId;

    const client = await MongoClient.connect('mongodb+srv://newsletteruser:S6iHou7gpgVhOS2k@cluster2.q5n56ip.mongodb.net/events?retryWrites=true&w=majority')

    if (req.method === 'POST') {
      // add server-side validation
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

      const result = await db.collection('comments').insertOne(newComment);

      console.log(result);

      res.status(201).json({ message: 'Added your silly comment', comment: newComment });
    }

      if (req.method === 'GET') {
          const dummyList = [
              { id: 'c1', name: 'Max', text: 'A 1st comment!' },
              { id: 'c2', name: 'Big Lebowski', text: 'A second comment!' },
          ];
          
      // const eventId = req.query.eventId;
          
      // const client = await MongoClient.connect(MONGODB_URI);
      // const db = client.db();
      // const commentsCollection = db.collection('comments');
      // const selectedComments = await commentsCollection.find({ eventId
      // }).toArray();
      // client.close();
      res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;