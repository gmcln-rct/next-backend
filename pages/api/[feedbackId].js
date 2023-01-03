import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function handler(req, res) {
    // if (req.method === 'POST') {
    //     const email = req.body.email;
    //     const text = req.body.text;

    //     const newFeedback = {
    //         id: new Date().toISOString(),
    //         email: email,
    //         text: text
    //     };

    //     // Store that in a database or in a file
    //     const filePath = buildFeedbackPath();
    //     const data = extractFeedback(filePath);
    //     data.push(newFeedback);
    //     fs

    //     res.status(201).json({ message: 'Success!', feedback: newFeedback });
    //     return;
    // }
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(item => item.id === feedbackId);

    res.status(200).json({ feedback: selectedFeedback });

}

export default handler;