const app = require('express')();
const bodyParser = require('body-parser');
const date = require('date-and-time');
const gPortNumber = require('./config/config').SERVER_PORT;
const proj = require('./config/config').PROJ;

/*  
* for cors
*/
// const cors = require('cors');
// const fs = require('fs');
// const https = require('https');
// app.use(cors());
// app.use(bodyParser.json());

app.use('/url',require('./demo'));

console.log()

if(proj == 'prod'){
    // ProEnv:
    https.createServer({
        // key: fs.readFileSync('./ssl/private.key'),
        // cert: fs.readFileSync('./ssl/auth-cert.pem'),
        // ca: fs.readFileSync('./ssl/eCA1_GTLSCA.crt')
        },app
    ).listen(gPortNumber,startListen);
}else{
    // DevEnv:
    app.listen(gPortNumber,startListen);
}


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;



function startListen() {
    console.log('listen', 'Now listening on port' + '(your ip):' + gPortNumber )
};