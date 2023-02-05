
import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. Try harder' });
      return;
    }

    let client;

    try {
      const client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to db failed utterly.' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
      return;
    }

    res.status(201).json({ message: 'You are signed up!' });
  }
}

export default handler;