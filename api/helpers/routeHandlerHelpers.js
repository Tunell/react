// Helper functions for the routeHandler
const helpers = {
    // Takes a req.url and extracts the table-name
    parseUrlToTable: url => url.split('/')[1].split('?')[0].replace('-', '_').slice(0, -1),

    // Takes a swagger.params and returns the parameters in a queryObject
    getQueryParams: (params) => {
        let queryObject = {};
        Object.keys(params).forEach((key) => {
            if(params[key].value !== undefined) {
                queryObject[key] = params[key].value;
            }
        });
        return queryObject;
    }
}
module.exports = helpers;