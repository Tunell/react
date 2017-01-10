const express = require('express');
const router = express.Router();
const routeHandler = require('./routeHandlers');

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