function handler(req, res) {

    const { eventId } = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({ message: 'Added comment', comment: newComment });
  }

    if (req.method === 'GET') {
    // const eventId = req.query.eventId;
        
    // const client = await MongoClient.connect(MONGODB_URI);
    // const db = client.db();
    // const commentsCollection = db.collection('comments');
    // const selectedComments = await commentsCollection.find({ eventId
    // }).toArray();
    // client.close();
    // res.status(200).json({ comments: selectedComments });
}
}

export default handler;