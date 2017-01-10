// Database
const mysql = require('promise-mysql');
const serverConfig = require('../config/config.json');
const pool = mysql.createPool(serverConfig.dbConfig);
const select = require('../db_queries/select');
const insert = require('../db_queries/insert');
const update = require('../db_queries/update');
const remove = require('../db_queries/remove');

const routeHandler = {
    get: (req, res) => {
        const query = Object.keys(req.query).length !== 0 ? req.query :
            req.params.id != undefined ? req.params : null;
        let selectFunc = req.query.user_id == undefined && req.params.id == undefined ? 'selectAll' : 'selectQuery';
        select[selectFunc](pool, parseUrlToTable(req.url), query)
            .then(rows => res.send(rows))
            .catch(err => res.send(err))
    },

    delete: (req, res) => {
        //const removeFunc = parseUrlToTable(req.url) === 'composite_material' ? 'deleteMultipleRows',
        remove.deleteId(pool, parseUrlToTable(req.url), req.params.id)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    },

    post: (req, res) => {
        const insertFunc = parseUrlToTable(req.url) === 'composite_material' ? 'insertMultRows' : 'insertRow';
        insert[insertFunc](pool, parseUrlToTable(req.url), req.body)
        .then(id => res.send(id))
        .catch(err => res.send(err))
    },

    put: (req, res) => {
        const putFunc = parseUrlToTable(req.url) === 'composite_material' ? 'updateMultRows' : 'updateRow';
        update[putFunc](pool, parseUrlToTable(req.url), req.params.id, req.body)
            .then(result => res.send(result))
            .catch(err => res.send(err))
    }
}


function parseUrlToTable(url) {
    return url.split('/')[1].split('?')[0].replace('-', '_').slice(0, -1);
}

module.exports = routeHandler;