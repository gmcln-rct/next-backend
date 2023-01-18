function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. Try harder' });
      return;
    }

    console.log(userEmail);

    res.status(201).json({ message: 'You are signed up!' });
  }
}

export default handler;