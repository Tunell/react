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


/*


 material: (pool, material) => {
 return pool.getConnection()
 .then( connection => connection.query('INSERT INTO material (user_id, name) VALUES (?, ?)',
 [material.user_id, material.name])
 .then( insertInfo => insertInfo.insertId.toString()))
 .catch( err => console.log(err));
 },

 compositeMaterial: (pool, compositeMaterial) => {
 let newCompositeMaterialId;
 return pool.getConnection()
 .then( connection => connection.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
 [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
 .then( insertInfo => {
 newCompositeMaterialId = insertInfo.insertId;
 compositeMaterial.materialComposition.forEach(material =>
 connection.query('INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)',
 [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount])
 );
 return newCompositeMaterialId;
 })
 .then(() => newCompositeMaterialId.toString()))
 .catch( err => console.log(err));
 }

 */


/*
return pool.getConnection()
    .then( connection => {
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
                [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id], function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }

                    var log = 'Post ' + result.insertId + ' added';

                    connection.query('INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)',
                        [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount]
                        , function(err, result) {
                            if (err) {
                                return connection.rollback(function() {
                                    throw err;
                                });
                            }
                            connection.commit(function(err) {
                                if (err) {
                                    return connection.rollback(function() {
                                        throw err;
                                    });
                                }
                                console.log('success!');
                            });
                        });
                });
        });
        */




/// last attempt


/*
 return pool.getConnection((err, connection) => {
 connection.beginTransaction(function (err) {
 if (err) {
 console.log(err);
 throw err;
 }
 connection.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
 [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id], function (err, result) {
 if (err) {
 return connection.rollback(cb(err));
 throw err;
 }
 let newCompositeMaterialId = result.insertId;
 compositeMaterial.materialComposition.forEach(material => {
 connection.query('INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)',
 [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount]
 , function (err, result) {
 if (err) {
 return connection.rollback(cb(err));
 throw err;
 }
 })

 });
 connection.commit(function (err) {
 if (err) {
 return connection.rollback(cb(err));
 throw err;
 }
 console.log('success!');
 return cb(newCompositeMaterialId);
 });
 });
 });
 })


 */



// one last

/*
 .then( () => {
 conn.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
 [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
 .then( insertInfo => {
 let newCompositeMaterialId = insertInfo.insertId;
 return Promise.all(compositeMaterial.materialComposition.map(material => {
 let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
 let inputs = [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount];
 return conn.query(query, inputs)
 }))
 .catch( err => {
 console.log(err);
 conn.query('ROLLBACK')
 return err;
 })
 // do queries inside transaction
 })
 .catch(err => {
 console.log(err)
 conn.query('ROLLBACK')
 errorFired = true;
 cb(err.message);
 return err;
 })})
 .then( () => {
 return conn.query('COMMIT')
 .then((id) => id)
 .catch(err => {
 console.log(err)
 conn.query('ROLLBACK')
 return err;
 })
 })
 .then(result => {
 console.log(result);
 if(!errorFired) {
 cb(result);
 }
 })
 .catch(err => {
 console.log(err)
 return err;
 })
 }


 */


// FUNKAR!
/*


 return pool.getConnection()
 .then(connection => {
 conn = connection;
 return connection.query('START TRANSACTION');
 })
 .then(() => {
 return conn.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
 [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
 .then(insertInfo => {
 let newCompositeMaterialId = insertInfo.insertId;
 return Promise.all(compositeMaterial.materialComposition.map(material => {
 let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
 let inputs = [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount];
 return conn.query(query, inputs)
 })
 )
 }
 )
 })
 .then(() => {
 return conn.query('COMMIT');
 })
 */