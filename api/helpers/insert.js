const insert = {
    // Insert a entry into a table in db
    insertRow: (pool, table, data) => {
        return pool.getConnection()
            .then( connection => connection.query('INSERT INTO ?? SET ?', [table, data])
                .then( insertInfo => {
                    connection.release();
                    return insertInfo
                }))
    },

    // Insert a composite-material, spans several tables
    // table parameter not used!
    insertCompositeMaterial: (pool, table, compositeMaterial) => {
        let conn;
        let compMatInsertInfo;
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
                        compMatInsertInfo = insertInfo;
                        let newCompositeMaterialId = insertInfo.insertId;
                        return Promise.all(compositeMaterial.composite_has_materials.map(material => {
                            let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
                            let input = [newCompositeMaterialId, material.material_id, material.recycle_type_id, material.unit_id, material.amount];
                            return conn.query(query, input)
                        }))
                    })
            })
            // Commit queries
            .then( () => conn.query('COMMIT'))
            .then( () => {
                connection.release();
                return compMatInsertInfo
            })
            // If violations or failure, rollback
            .catch( err => {
                conn.query('ROLLBACK')
                connection.release();
                return err.message
            })
    }
}

module.exports = insert;

