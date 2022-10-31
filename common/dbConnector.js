/*  
 * Common module: MsSQL query
 * Update: 2021/08/04
*/
const sql = require('mssql');
const date = require('date-and-time');
const mSqlConf = require('../dbConfig').default;

// For select command(回傳資料)
function impQuery(pScript) {
    return sql.connect(mSqlConf).then(pool => {
        return pool.request().query(pScript).then( pResult => {
            return pResult.recordset;
        }).catch( pErr => {
            loggin(5,'impQuery',JSON.stringify(pErr));
            return { error: true, message: pErr};
        });
    });    
};

// For insert / update / delete command(不回傳資料)
function impNonQuery(pScript) {
    return sql.connect(mSqlConf).then(pool => {
        return pool.request().query(pScript).then( pResult => {
            
            // sql.close();
            return pResult.rowsAffected;
        }).catch( pErr => {
            loggin(5,'impNonQuery',JSON.stringify(pErr));
            return { error: true, message: pErr};
        });
        
    }); 
};

function loggin(pLv, pFun, pMsg) {
    try{
        sql.connect(mSqlConf).then(pool => {
            pMsg = (pMsg.length > 10000)? pMsg.substr(0, 10000): pMsg;
            pMsg = pMsg.replace(/\'/g, '`');  
            
            let vLogString = "INSERT [MEDIA_TRANSMISSION].[dbo].[tb_api_syslog] VALUES(" +
                "'"+ date.format(new Date(), 'YYYY/MM/DD HH:mm:ss') + "'," +
                "'dbConnector'," +
                "'"+ pFun + "'," +
                "'"+ pLv + "'," +
                "'"+ pMsg + "');";
            pool.request().query(vLogString);
        });    
    } catch(e) {
        
    }
};

module.exports = {
    query: impQuery,
    nonQuery: impNonQuery,
};