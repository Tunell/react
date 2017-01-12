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


function getAll(req, res) {
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        select.selectCompositeMaterialAll(pool)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err.message))
    } else {
        select.selectAll(pool, helpers.parseUrlToTable(req.url), queryObject)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err.message))
    }
}

function getId(req, res) {
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        select.selectCompositeMaterialId(pool, queryObject.id)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err.message))
    } else {
        select.selectQuery(pool, helpers.parseUrlToTable(req.url), queryObject)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err.message))
    }
}

function post (req, res) {
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    const insertFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'insertMultRows' : 'insertRow';
    insert[insertFunc](pool, helpers.parseUrlToTable(req.url), data)
        .then(id => res.json(id))
        .catch(err => res.status(500).json(err.message))
}

function put (req, res) {
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    const putFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'updateMultRows' : 'updateRow';
    update[putFunc](pool, helpers.parseUrlToTable(req.url), req.swagger.params.id.value, data)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err.message))
}


function deleteRow (req, res) {
    remove.deleteId(pool, helpers.parseUrlToTable(req.url), req.swagger.params.id.value)
        .then(num_changed_rows => res.json(num_changed_rows))
        .catch(err => res.status(500).json(err.message))
}

function getApi (req, res) {
    res.send('../../dist/index.html')
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
    deleteRecycleType: deleteRow
};
