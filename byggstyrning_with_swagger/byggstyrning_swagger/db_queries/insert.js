const insert = {
    insertRow: (pool, table, data) => {
        return pool.getConnection()
            .then( connection => connection.query('INSERT INTO ?? SET ?', [table, data])
                .then( insertInfo => insertInfo.insertId.toString()))
            .catch( err => console.log(err));
    },

    insertMultRows: (pool, table, compositeMaterial) => {
        let conn;
        return pool.getConnection()
        // Start transaction
            .then(connection => {
                conn = connection;
                return connection.query('START TRANSACTION');
            })
            // Add queries
            .then( () => {
                // Query 1
                return conn.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
                    [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
                    .then( insertInfo => {
                        // Query 2
                        let newCompositeMaterialId = insertInfo.insertId;
                        return Promise.all(compositeMaterial.materialComposition.map(material => {
                            let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
                            let input = [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount];
                            return conn.query(query, input)
                        }))
                    })
            })
            // Commit queries
            .then( () => conn.query('COMMIT'))
            // If violations or failure, rollback
            .catch( err => {
                conn.query('ROLLBACK')
                return err.message
            })
    }
}

module.exports = insert;

