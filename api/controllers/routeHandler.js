'use strict';
const util = require('util');
// Database
const mysql = require('promise-mysql');
console.log('got to here!!')
const serverConfig = {
    "connectionLimit": 100,
    host     : process.env.RDS_HOSTNAME || "localhost",
    user     : process.env.RDS_USERNAME || "root",
    password : process.env.RDS_PASSWORD || "Wrufrafr",
    port     : process.env.RDS_PORT || 3306,
    database : process.env.RDS_DB_NAME || "byggstyrning"
};
const pool = mysql.createPool(serverConfig);
const selectComp = require('../helpers/select');
const insert = require('../helpers/insert');
const update = require('../helpers/update');
const remove = require('../helpers/remove');
const query = require('../helpers/generatedQueries');
const helpers = require('../helpers/routeHandlerHelpers');

// Get all the entries associated with endpoint
function getAll(req, res) {
    // Extract query parameters
    // Composite material has a specific query
    if (helpers.parseUrlToTable(req.url) === 'composite_material') {
        selectComp.all(pool)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else {
        let SQLquery = helpers.dbQueryBuilder(req.swagger);
        query.select(pool, SQLquery)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }
}

// Get entries associated with a single id
function getId(req, res) {
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        selectComp.id(pool, queryObject.id)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else {
        let SQLquery = helpers.dbQueryBuilder(req.swagger);
        query.select(pool, SQLquery)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }
}

// Create a new entry
function post (req, res) {
    // Extract the data that is to be inserted
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    // Determine which function to use
    const insertFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'insertCompositeMaterial' : 'insertRow';
    insert[insertFunc](pool, helpers.parseUrlToTable(req.url), data)
        .then(result => res.status(201).json(helpers.addMeta(result, req)))
        .catch(err => res.status(500).json(err.message))
}

// Change a entry
// Handles both entries that has a single row and multiple rows
function put (req, res) {
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    const putFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'updateCompositeMaterial' : 'updateRow';
    update[putFunc](pool, helpers.parseUrlToTable(req.url), req.swagger.params.id.value, data)
        .then(result => res.status(204).json(result))
        .catch(err => res.status(500).json(err.message))
}

// Delete a entry
function deleteRow (req, res) {
    remove.deleteId(pool, helpers.parseUrlToTable(req.url), req.swagger.params.id.value)
        .then(result => res.status(204).json(result))
        .catch(err => res.status(500).json(err.message))
}

module.exports = {
    getUsedMaterialAll: getAll,
    getUsedMaterialId: getId,
    postUsedMaterial: post,
    putUsedMaterial: put,
    deleteUsedMaterial: deleteRow,

    getMaterialAll: getAll,
    getMaterialId: getId,
    postMaterial: post,
    putMaterial: put,
    deleteMaterial: deleteRow,

    getCompositeMaterialAll: getAll,
    getCompositeMaterialId: getId,
    postCompositeMaterial: post,
    putCompositeMaterial: put,
    deleteCompositeMaterial: deleteRow,

    getUnitAll: getAll,
    getUnitId: getId,
    postUnit: post,
    putUnit: put,
    deleteUnit: deleteRow,

    getRecycleTypeAll: getAll,
    getRecycleTypeId: getId,
    postRecycleType: post,
    putRecycleType: put,
    deleteRecycleType: deleteRow,

    getUserAll: getAll,
    getUserId: getId,
    postUser: post,
    putUser: put,
    deleteUser: deleteRow
};
