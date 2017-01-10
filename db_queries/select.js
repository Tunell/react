const select = {
    selectQuery: (pool, table, query) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM ?? WHERE ?', [table, query])
                .then( rows => rows))
            .catch( err => console.log(err));
    },
    selectAll: (pool, table, unUsedQuery) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM ??', [table])
                .then( rows => rows))
            .catch( err => console.log(err));
    }
}

module.exports = select;

/*
 usedMaterial: (pool, query) => {
 return pool.getConnection()
 .then( connection => connection.query('SELECT * FROM used_material WHERE user_id = ?', [user_id])
 .then( rows => rows))
 .catch( err => console.log(err));
 },

 material: pool => {
 return pool.getConnection()
 .then( connection => connection.query('SELECT * FROM material')
 .then( rows => rows))
 .catch( err => console.log(err));
 },

 compositeMaterial: (pool, user_id) => {
 return pool.getConnection()
 .then( connection => connection.query('SELECT * FROM composite_material WHERE user_id = ?', [user_id])
 .then( rows => rows))
 .catch( err => console.log(err));
 },
 */