const generated = {
    select: (pool, query) => {
    return pool.getConnection()
        .then( connection => connection.query(query)
            .then( rows => {
                connection.release();
                return rows
            }))
    }
}

module.exports = generated;