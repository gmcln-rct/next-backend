import fs from 'fs';
import path from 'path';

function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}


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
        const filePath = buildFeedbackPath();
        // const fileData = fs.readFileSync(filePath);
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        console.log(newFeedback);
        res.status(201).json({ message: 'Success!', feedback: newFeedback });
    } else {
    // Code inside here will not be exposed to visitors
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({ message: 'This req works!' });
    }
}

export default handler;