const environment = process.env.NODE_ENV || 'dev';
let config = require('./dev.config');
if(environment !== 'dev'){
    config = require(`./${environment}.config.js`);
}

module.exports = config
