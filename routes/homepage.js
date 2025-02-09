const express = require('express');

const router = express.Router();

app.get('/', (req, res) => {
    res.render('index',  {
        message: 'Hello',
        title: "My Express App"
    })
});

module.exports = router;
