const _ = require('lodash');
const queryBuilder = require('./queryBuilder');
// Helper functions for the routeHandler
const helpers = {
    // Takes a req.url and extracts the table-name
    parseUrlToTable: url => url.split('/')[2].split('?')[0].replace('-', '_').slice(0, -1),

    // Takes a swagger.params and returns the parameters in a queryObject
    getQueryParams: (params) => {
        let queryObject = {};
        Object.keys(params).forEach((key) => {
            if(params[key].value !== undefined) {
                queryObject[key] = params[key].value;
            }
        });
        return queryObject;
    },

    addMeta: (dbInfo, req) => {
        let metaObject = dbInfo;
        metaObject.links = {
            rel: "self",
            href: `http://${req.swagger.swaggerObject.host}${req.swagger.apiPath}/${dbInfo.insertId}`
        }
        return metaObject;
    },

    dbQueryBuilder: queryBuilder.dbQueryBuilder

}
module.exports = helpers;