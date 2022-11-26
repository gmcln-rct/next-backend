

function handler(req, res) {
    // Code inside here will not be exposed to visitors
    res.status(200).json({ message: 'This req works!' });
}

export default handler;