const app = require('express')();
const SERVER_PORT = 8080;
const router = require('express').Router();

// router
app.use('/url', 
    
    // way 1
    require('./express_web_demo'),
    // way 2
    router.get('/demo/2', (req, res) => { 
        res.send('hello_2');
    })
);

app.listen(SERVER_PORT,startListen);

function startListen() {
    console.log('listen', 'Now listening on port' + '(your ip):' + SERVER_PORT )
};
