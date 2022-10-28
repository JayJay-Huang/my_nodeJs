/*  
 * Switch the environment
*/
let env;
switch_env(env);
module.exports = require('./env_'+ env);


//#region 
function switch_env(pEnv = 0){
    switch(pEnv){
        case 1: 
            env = 'uat';
            break;
        case 2: 
            env = 'prod';
            break;
        default:
            env = 'dev';
    }
}
//#endregion