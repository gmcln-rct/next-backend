import { MongoClient } from 'mongodb';

async function connectDatabase () {
  const client = await MongoClient.connect(
    'mongodb+srv://newsletteruser:S6iHou7gpgVhOS2k@cluster2.q5n56ip.mongodb.net/?retryWrites=true&w=majority'
  );

  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  return db.collection('newsletter').insertOne(document);
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. Try harder' });
      return;
    }

    try {
      const client = await connectDatabase();

    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
      return;
    }

    try {

      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
      return;
    }





    console.log("userEmail: ", userEmail)

    res.status(201).json({ message: 'You are signed up!' });
  }
}

export default handler;