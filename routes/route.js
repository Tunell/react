const express = require('express');
const router = express.Router();
const routeHandler = require('./routeHandlers');

router.route('/used-materials/')
    .get((req, res) => routeHandler.get(req, res))
    .post((req, res) => routeHandler.post(req, res))

router.route('/used-materials/:id')

    .get((req, res) => routeHandler.get(req, res))

    .put((req, res) => {
        let updateUsedMaterial = {
            id: req.params.id,
            composite_material_id: req.body.composite_material_id,
            amount: req.body.amount,
            comment: req.body.comment
        };

        update.usedMaterial(pool, updateUsedMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => routeHandler.delete(req, res))

router.route('/materials')

    .get((req, res) => routeHandler.get(req, res))
    .post((req, res) => routeHandler.post(req, res))

router.route('/materials/:id')

    .get((req, res) => routeHandler.get(req, res))

    .put((req, res) => {
        let updateMaterial = {
            id: req.body.id,
            name: req.body.name
        };
        update.material(pool, updateMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => routeHandler.delete(req, res))

router.route('/composite-materials/')

    .get((req, res) => routeHandler.get(req, res))

    .post((req, res) => routeHandler.post(req, res))


router.route('/composite-materials/:id')

    .get((req, res) => routeHandler.get(req, res))


    .put((req, res) => {
        let updateCompositeMaterial = {
            id: req.params.id,
            name: req.body.name,
            unit_id: req.body.unit_id,
            materialComposition: req.body.materialComposition
        };
        update.compositeMaterial(pool, updateCompositeMaterial)
            .then(num_changed_rows => res.send(num_changed_rows))
            .catch(err => res.send(err))
    })

    .delete((req, res) => routeHandler.delete(req, res))

module.exports = router;