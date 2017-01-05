// Database
const mysql = require('promise-mysql');
const serverConfig = require('../config/config.json');
const pool = mysql.createPool(serverConfig.dbConfig);
const select = require('../db_queries/select').select;
const insert = require('../db_queries/insert').insert;
const update = require('../db_queries/update').update;

const express = require('express');
const router = express.Router();

router.route('/used-materials/:user_id')
    .get((req, res) => {
        select.usedMaterial(pool, req.params.user_id)
            .then(rows => res.send(rows))
            .catch(err => res.send(err))
    })

    .post((req, res) => {
        let newUsedMaterial = {
            composite_material_id: req.body.composite_material_id,
            user_id: req.body.user_id,
            amount: req.body.amount,
            comment: req.body.comment
        };
        insert.usedMaterial(pool, newUsedMaterial)
            .then(id => res.send(id))
            .catch(err => res.send(err))
    })

    .put((req, res) => {
        let updateUsedMaterial = {
            id: req.body.id,
            composite_material_id: req.body.composite_material_id,
            amount: req.body.amount,
            comment: req.body.comment
        };
        update.usedMaterial(pool, updateUsedMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => {
        //:TODO
    })


router.route('/materials')
    .get((req, res) => {
        select.material(pool)
            .then(rows => res.send(rows))
            .catch(err => res.send(err))
    })

    .post((req, res) => {
        let newMaterial = {
            user_id: req.body.user_id,
            name: req.body.name
        };
        insert.material(pool, newMaterial)
            .then(id => res.send(id))
            .catch(err => res.send(err))
    })

    .put((req, res) => {
        let updateMaterial = {
            id: req.body.id,
            name: req.body.name
        };
        update.material(pool, updateMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => {
        //:TODO
    })


router.route('/composite-materials/:user_id')
    .get((req, res) => {
        console.log('got request')
        select.compositeMaterial(pool, req.params.user_id)
            .then(rows => res.send(rows))
            .catch(err => res.send(err))
    })

    .post((req, res) => {
        let newCompositeMaterial = {
            user_id: req.body.user_id,
            name: req.body.name,
            unit_id: req.body.unit_id,
            materialComposition: req.body.materialComposition
        };
        insert.compositeMaterial(pool, newCompositeMaterial)
            .then(id => res.send(id))
            .catch(err => res.send(err))
    })

    .put((req, res) => {
        let updateCompositeMaterial = {
            id: req.body.id,
            name: req.body.name,
            unit_id: req.body.unit_id,
            materialComposition: req.body.materialComposition
        };
        update.compositeMaterial(pool, updateCompositeMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => {
        //:TODO
    })

module.exports = router;