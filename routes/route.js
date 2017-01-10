const express = require('express');
const router = express.Router();
const routeHandler = require('./routeHandlers');
const mysql = require('promise-mysql');
const serverConfig = require('../config/config.json');
const pool = mysql.createPool(serverConfig.dbConfig);
const select = require('../db_queries/select');
const insert = require('../db_queries/insert');
const update = require('../db_queries/update');
const remove = require('../db_queries/remove');

router.route('/used-materials/')
    .get((req, res) => routeHandler.get(req, res))
    .post((req, res) => routeHandler.post(req, res))

router.route('/used-materials/:id')

    .get((req, res) => routeHandler.get(req, res))
    .put((req, res) => routeHandler.put(req, res))
    .delete((req, res) => routeHandler.delete(req, res))

router.route('/materials')

    .get((req, res) => routeHandler.get(req, res))
    .post((req, res) => routeHandler.post(req, res))

router.route('/materials/:id')

    .get((req, res) => routeHandler.get(req, res))
    .put((req, res) => routeHandler.put(req, res))
    .delete((req, res) => routeHandler.delete(req, res))

router.route('/composite-materials/')

    .get((req, res) => routeHandler.get(req, res))
    .post((req, res) => routeHandler.post(req, res))

router.route('/composite-materials/:id')

    .get((req, res) => routeHandler.get(req, res))
    .put((req, res) => routeHandler.put(req, res))
    .delete((req, res) => routeHandler.delete(req, res))

module.exports = router;