const axios = require('axios').default;
const sql = require('./dbConnector');
const inToDb = require('./InsertData');


//#region MoniTag class
let str = " select * from  [MEDIA_TRANSMISSION].[dbo].[tb_api_monitor_settings] ";
class MoniTag{
    constructor(str){
        return sql.query(str)
    }
}
const gMoniTag =  new MoniTag(str);
//#endregion

// Get the http status
function getHttpStatus(url, httpMethod = 'get', config, headers = ""){
    let response = {};
    let vHeaders = { headers: headers};
    return axios[httpMethod.trim().toLowerCase()](url, config, vHeaders)
    .then(res => {
        response.statusCode = String(res.status);
        response.statusMsg = res.statusText;
        response.headers = res.headers;
        return response;
    }).catch(err => {
        if(err.response == undefined){
            response.statusCode = 'enotfound';
            response.statusMsg = err.message;
            response.headers = null;
        }else{
            response.statusCode = String(err.response.status);
            response.statusMsg = err.response.statusText;
            response.headers = err.response.headers;
        }
        return response;
    });
};

// Get the monitor teg
function getMoniTag(){
    return gMoniTag;
}

// Check the dataset if it's opendata
function checkDataset(tag){
    let result = true;
    let str = " select param, resourceID, dataset "
    + " from [MEDIA_TRANSMISSION].[dbo].[tb_api_opendata_taipei_dataset] "
    + " where dataId = '"+ tag.mid +"' ";
    return sql.query(str).then(vObj=>{
        vObj = vObj[0];
        if(tag.config.resourceID != vObj.resourceID) result = false;
        if(tag.config.dataset != vObj.dataset) result = false;
        return result;
    })
    .catch(err=>{
        tlog.error(5,'launchMoni()', JSON.stringify(err));
    });
}

// To insert the minitor result into db
function launchMoni(moni) {
    getHttpStatus(moni.tag.httpUrl, moni.tag.httpMethod)
    .then(apiRes => {
        let data = inToDb.map(apiRes, moni.tag);
        data = inToDb.getStr(data, '[MEDIA_TRANSMISSION].[dbo].[tb_api_monitor_log]');
        inToDb.update(data, data.length);
    })
    .catch(err=>{
        // tlog.error(5,'launchMoni()', JSON.stringify(err));
        console.log('launchMoni() err ='+ err)
    });
}

module.exports = {
    getHttpStatus: getHttpStatus,
    getTag: getMoniTag,
    checkDataset: checkDataset,
    launchMoni: launchMoni
};