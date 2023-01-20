import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. Try harder' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://newsletteruser:S6iHou7gpgVhOS2k@cluster2.q5n56ip.mongodb.net/?retryWrites=true&w=majority'
    );

    const db = client.db();

      // const newsletterCollection = db.collection('newsletter');

    await db.collection('emails').insertOne({ email: userEmail });

    res.status(201).json({ message: 'You are signed up!' });
  }
}

export default handler;