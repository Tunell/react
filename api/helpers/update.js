const _ = require('lodash');
const update = {
    // Update a entry in db
    updateRow: (pool, table, id, data) => {
        return pool.getConnection()
            .then( connection => connection.query('UPDATE ?? SET ? WHERE id = ?',
                [table, data, id])
                .then( updateInfo => updateInfo.changedRows))
    },

    // Update a composite material, spans serveral tables
    // table not used!
    updateCompositeMaterial: (pool, table, id, compositeMaterial) => {
        let conn;
        return pool.getConnection()
            .then(connection => {
                conn = connection;
                return conn.query('START TRANSACTION');
            })
            .then( () => {
                let query = 'UPDATE composite_material SET name = ?, unit_id = ? WHERE id = ?';
                let input = [compositeMaterial.name, compositeMaterial.unit_id, id];
                return conn.query(query, input)
                    .then( () => {
                        return Promise.all(compositeMaterial.composite_has_materials.map(material => {
                            let query;
                            let input
                            if(_.has(material, 'old')) {
                                query =  'UPDATE composite_has_material SET material_id = ?, recycle_type_id = ?, unit_id = ?, amount = ? WHERE (composite_material_id = ? AND material_id = ? AND recycle_type_id = ? AND unit_id = ?)';
                                input = [material.new.material_id, material.new.recycle_type_id, material.new.unit_id, material.new.amount, id, material.old.material_id, material.old.recycle_type_id, material.old.unit_id];
                            } else {
                                query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
                                input = [id, material.new.material_id, material.new.recycle_type_id, material.new.unit_id, material.new.amount];
                            }
                            return conn.query(query, input)
                        }))
                    })
            })
            .then( () => conn.query('COMMIT'))
            .catch( err => {
                conn.query('ROLLBACK')
                return err.message
            })
    }
}

module.exports = update;

