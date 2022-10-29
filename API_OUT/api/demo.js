const express = require('express');
const router = express.Router();

router.get('/demo/1', (req, res) => { 
    res.send('hello!');
});

router.post('/demo/1', (req, res) => { 
    res.send(req.body);
});

module.exports = router;