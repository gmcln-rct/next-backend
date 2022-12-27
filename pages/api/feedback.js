import fs from 'fs';
import path from 'path';

function handler(req, res) {
    if (req.method === 'POST') {
        // Next parses body for us
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        };

        // Store that in a database or in a file
        const filePath = path.join(process.cwd(), 'data', 'feedback.json');
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        // console.log(newFeedback);
        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    }
    // Code inside here will not be exposed to visitors
    res.status(200).json({ message: 'This req works!' });
}

export default handler;