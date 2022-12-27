function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        };

        console.log(newFeedback);
        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    }
    // Code inside here will not be exposed to visitors
    res.status(200).json({ message: 'This req works!' });
}

export default handler;