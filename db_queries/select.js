const select = {
    usedMaterial: (pool, user_id) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM used_material WHERE user_id = ?', [user_id])
            .then( rows => rows))
            .catch( err => done(err));
    },

    material: pool => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM material')
            .then( rows => rows))
            .catch( err => done(err));
    },

    compositeMaterial: (pool, user_id) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM composite_material WHERE user_id = ?', [user_id])
            .then( rows => rows))
            .catch( err => done(err));
    },
}

exports.select = select;
