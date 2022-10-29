const app = require('express')();
const bodyParser = require('body-parser');
const date = require('date-and-time');
// const gPortNumber = require('./config/config').SERVER_PORT;
const gPortNumber = 8080;
const proj = require('./config/config').PROJ;

app.use('/url',require('./demo'));

if(proj == 'prod'){
    // ProEnv: for cors
    const cors = require('cors');
    const fs = require('fs');
    const https = require('https');
    app.use(cors());
    app.use(bodyParser.json());
    https.createServer({
        key: fs.readFileSync('./ssl/private.key'),
        cert: fs.readFileSync('./ssl/auth-cert.pem'),
        ca: fs.readFileSync('./ssl/eCA1_GTLSCA.crt')
        },app
    ).listen(gPortNumber,startListen);
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    
}else{
    // DevEnv:
    app.listen(gPortNumber,startListen);
}

function startListen() {
    console.log('listen', 'Now listening on port' + '(your ip):' + gPortNumber )
};

// 使用原生
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 8085;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     let vResopnse = 'hello wrold!';
//     res.end(vResopnse);
// });
