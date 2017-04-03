'use strict';
const util = require('util');
const selectComp = require('../helpers/select');
const insert = require('../helpers/insert');
const update = require('../helpers/new_update');
const remove = require('../helpers/remove');
const query = require('../helpers/generatedQueries');
const helpers = require('../helpers/routeHandlerHelpers');
const _ = require('lodash')
const errorParser = require('./../helpers/dbErrorParser')

// Get all the entries associated with endpoint

function isEmpty(result) {
    return result.length === 0
}

function get(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	res.header('eTag', 'false');
    _.has(req.swagger.params, 'id') ? getId(req, res) : getAll(req, res)
}

function getAll(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	res.header('eTag', 'false');
    // Extract query parameters
    // Composite material has a specific query
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if (helpers.parseUrlToTable(req.url) === 'composite_material') {
        selectComp.all(queryObject.user_id)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else {
        let SQLquery = helpers.dbQueryBuilder(req.swagger);
        query.select(SQLquery, queryObject.user_id)
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    }
}

// Get entries associated with a single id
function getId(req, res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	res.header('eTag', 'false');
    const queryObject = helpers.getQueryParams(req.swagger.params);
    if(helpers.parseUrlToTable(req.url) === 'composite_material') {
        selectComp.id(queryObject.id)
            .then(result => isEmpty(result) ? res.status(404).json({message:'Not Found'}): res.json(result))
            .catch(err => res.status(500).json(err.message))
    } else {
        let SQLquery = helpers.dbQueryBuilder(req.swagger);
        query.select(SQLquery, queryObject.id)
            .then(result => isEmpty(result) ? res.status(404).json({message:'Not Found'}): res.json(result))
            .catch(err => res.status(500).json(err.message))
    }
}

// Create a new entry
function post (req, res) {
    // Extract the data that is to be inserted
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    // Determine which function to use
    const insertFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'insertCompositeMaterial' : 'insertRow';
    insert[insertFunc](helpers.parseUrlToTable(req.url), data)
        .then(result => res.status(201).json(helpers.addMeta(result, req)))
        .catch(err => res.status(err.statusCode).json({error: err}))
}

// Change a entry
// Handles both entries that has a single row and multiple rows
function put (req, res) {
    let data = req.swagger.params[Object.keys(req.swagger.params)[0]].value;
    const putFunc = helpers.parseUrlToTable(req.url) === 'composite_material' ? 'updateCompositeMaterial' : 'updateRow';
    update[putFunc](helpers.parseUrlToTable(req.url), req.swagger.params.id.value, data)
        .then(result => res.status(204).json(result))
        .catch(err => res.status(err.statusCode).json({error: err}))
}

// Delete a entry
function deleteRow (req, res) {
    remove.deleteId(helpers.parseUrlToTable(req.url), req.swagger.params.id.value)
        .then(result => parseInt(result) === 0 ? res.status(404).json({message:'Not Found'}) : res.status(204).json(result))
        .catch(err => {
            const error = errorParser.createErrorResponse(err)
            res.status(error.statusCode).json({error: error})
        })
}

module.exports = {
    get,
    post,
    put,
    "delete": deleteRow
};
