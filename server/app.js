const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'server is healthy'
    })
})

app.listen(PORT, () => {
    console.log("The server is running on port " + PORT);
})