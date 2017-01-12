const update = {
    updateRow: (pool, table, id, data) => {
        return pool.getConnection()
            .then( connection => connection.query('UPDATE ?? SET ? WHERE id = ?',
                [table, data, id])
                .then( updateInfo => updateInfo.changedRows.toString()))
            .catch( err => console.log(err));
    },

    updateMultRows: (pool, table, id, compositeMaterial) => {
        let conn;
        let changedRows = 0;
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
                        return Promise.all(compositeMaterial.materialComposition.map(material => {
                            let query =  'UPDATE composite_has_material SET material_id = ?, recycle_class_id = ?, unit_id = ?, amount = ? WHERE (composite_material_id = ? AND material_id = ? AND recycle_class_id = ? AND unit_id = ?)';
                            let input = [material.new.material_id, material.new.recycle_class_id, material.new.unit_id, material.new.amount, id, material.old.material_id, material.old.recycle_class_id, material.old.unit_id];
                            return conn.query(query, input)
                        }))
                    })
            })
            .then( () => conn.query('COMMIT'))
            .then( () => 'success')
            .catch( err => {
                conn.query('ROLLBACK')
                return err.message
            })
    }
}

module.exports = update;

