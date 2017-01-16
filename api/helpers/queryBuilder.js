const helpers = require('./routeHandlerHelpers')
const _ = require('lodash');

const queryBuilder = {
    dbQueryBuilder: (swaggerReq) => {
        let mainTable = getTableFromPath(swaggerReq);
        let userParams = getQueryParams(swaggerReq.params);
        let props = swaggerReq.operation.responses['200'].schema.type === 'array' ?
            swaggerReq.operation.responses['200'].schema.items.properties : swaggerReq.operation.responses['200'].schema.properties;
        let relatedTables = getTablesFromProps(props);
        return buildQuery(mainTable, relatedTables, props, userParams);
    }
}

module.exports = queryBuilder;

function getQueryParams(params) {
    let queryObject = {};
    Object.keys(params).forEach((key) => {
        if(params[key].value !== undefined) {
            queryObject[key] = params[key].value;
        }
    });
    return queryObject;
}

function getTableFromPath(swaggerReq) {
    return swaggerReq.apiPath.split('/')[1].replace('-', '_').slice(0, -1)
}

function getTablesFromProps(props) {
    let tables = [];
    Object.keys(props).forEach((key) => {
        let propParts = key.split('_');
        if(propParts[propParts.length-1] === 'id' && propParts.length !== 1) {
            tables.push(propParts.reduce( (tableName, part) => {
                if(part === 'id') {
                    return tableName;
                } else {
                    return tableName + '_' + part;
                }
            } ));
        }
    });
    return tables
}

function getTableFromProp(prop) {
    let propRemovedEnd = prop.split('_');
    propRemovedEnd.pop();
    return propRemovedEnd.reduce( (tableName, part) => tableName + '_' + part)
}

function buildQuery(mainTable, relatedTables, props, userParams) {
    let tableAttr = getTableAttr(props);
    let tables = [mainTable].concat(relatedTables);
    let selectors = convertAttrToSelectors(mainTable, tableAttr)
    let selectQuery = selectors.toString();
    let fromQuery = tables.toString();
    let whereQuery = createWhere(mainTable, relatedTables);
    if(whereQuery === '' && _.has(userParams, 'id')){
        whereQuery = `${mainTable}.id = ${userParams.id}`;
    } else if(whereQuery === '' && !(_.has(userParams, 'id'))){
        whereQuery = 'true';
    } else {
        whereQuery = _.has(userParams, 'id') ? whereQuery + ` AND ${mainTable}.id = ${userParams.id}` : whereQuery
    }
    let SQLquery = String.raw`SELECT ${selectQuery}
        FROM ${fromQuery}
        WHERE ${whereQuery}`
    return SQLquery
}

function getTableAttr(props) {
    let tableAttributes = {
        main: [],
        related: []
    };
    Object.keys(props).forEach( prop => {
        if(prop.split('_').length < 2) {
            tableAttributes.main.push(prop)
        } else {
            tableAttributes.related.push(prop)
        }
    })
    return tableAttributes
}

function convertAttrToSelectors(mainTable, tableAttr) {
    let mainSelectors = tableAttr.main.map( attr => `${mainTable}.${attr}`);
    let relSelectors = tableAttr.related.map( attr => {
        let table = getTableFromProp(attr);
        let identifier = attr.split('_');
        let attrName = identifier[identifier.length-1];
        return `${table}.${attrName} AS ${attr}`
    })
    let selectors = mainSelectors.concat(relSelectors);
    return selectors;
}

function createWhere(mainTable, relatedTables) {
    let whereQueries = relatedTables.map( relTable => `${mainTable}.${relTable}_id = ${relTable}.id`)
    let queryString = '';
    for(let i = 0; i < whereQueries.length; i++) {
        if(i !== whereQueries.length-1) {
            queryString += whereQueries[i] + ' AND '
        } else {
            queryString += whereQueries[i]
        }
    }
    return queryString
}


