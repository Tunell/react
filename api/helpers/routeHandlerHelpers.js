const helpers = {
    parseUrlToTable: url => url.split('/')[1].split('?')[0].replace('-', '_').slice(0, -1),

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