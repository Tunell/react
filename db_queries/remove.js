const remove = {
    usedMaterial: (pool, ids) => {
        return pool.getConnection()
            .then( connection => {
                return Promise.all(ids.map( id => connection.query('DELETE FROM used_material WHERE id = ?', [id])
                    .then( deleteInfo => deleteInfo.affectedRows)
                ))
                    .then( arrDeletedRows => arrDeletedRows.reduce((sum, deletedRows) => deletedRows + sum).toString())
            })
            .catch( err => console.log(err));
    },

    material: (pool, ids) => {
        return pool.getConnection()
            .then( connection => {
                return Promise.all(ids.map( id => connection.query('DELETE FROM material WHERE id = ?', [id])
                    .then( deleteInfo => deleteInfo.affectedRows)
                ))
                    .then( arrDeletedRows => arrDeletedRows.reduce((sum, deletedRows) => deletedRows + sum).toString())
            })
            .catch( err => console.log(err));
    },

    compositeMaterial: (pool, ids) => {
        return pool.getConnection()
            .then( connection => {
                return Promise.all(ids.map( id => {
                        return Promise.all(connection.query('DELETE FROM composite_has_material WHERE composite_material_id = ?', [id]))
                            .then( result => {
                                connection.query('DELETE FROM composite_material WHERE id = ?', [id])
                                    .then( deleteInfoCompMaterial => deleteInfoCompMaterial.affectedRows + result.affectedRows)
                            })
                    }
                ))
                    .then( arrDeletedRows => arrDeletedRows.reduce((sum, deletedRows) => deletedRows + sum).toString())
            })
            .catch( err => console.log(err));
    }
}

module.exports = remove;



/*compositeMaterial: (pool, ids) => {
    return pool.getConnection()
        .then( connection => {
            return Promise.all(ids.map( id => {
                    return new Promise((resolve, reject) => {
                        resolve({ deleteInfo: connection.query('DELETE FROM composite_has_material WHERE composite_material_id = ?', [id]), id });
                    })
                        .then( result => {
                            connection.query('DELETE FROM composite_material WHERE id = ?', [result.id])
                                .then( deleteInfoCompMaterial => deleteInfoCompMaterial.affectedRows + result.deleteInfo.affectedRows)
                        })
                }
            ))
                .then( arrDeletedRows => arrDeletedRows.reduce((sum, deletedRows) => deletedRows + sum).toString())
        })
        .catch( err => console.log(err));
}
}
*/
