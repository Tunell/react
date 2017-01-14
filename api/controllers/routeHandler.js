'use strict';
const util = require('util');
// Database
const mysql = require('promise-mysql');
const serverConfig = require('../../config/config.json');
const pool = mysql.createPool(serverConfig.dbConfig);
const select = require('../helpers/select');
const insert = require('../helpers/insert');
const update = require('../helpers/update');
const remove = require('../helpers/remove');
const helpers = require('../helpers/routeHandlerHelpers');

// Get all the entries associated with endpoint
function getAll(req, res) {
    // Extract query parameters
    const queryObject = helpers.getQueryParams(req.swagger.params);
    // Composite material has a specific query
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        select.selectCompositeMaterialAll(pool)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else if(helpers.parseUrlToTable(req.url) === 'used_material') {
        select.selectUsedMaterialAll(pool)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }

    else {
        select.selectAll(pool, helpers.parseUrlToTable(req.url), queryObject)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }
}

// Get entries associated with a single id
function getId(req, res) {
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        select.selectCompositeMaterialId(pool, queryObject.id)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else if(helpers.parseUrlToTable(req.url) === 'used_material') {
        select.selectUsedMaterialId(pool, queryObject.id)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }else {
        select.selectQuery(pool, helpers.parseUrlToTable(req.url), queryObject)
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
