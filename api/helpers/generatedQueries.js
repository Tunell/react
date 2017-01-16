const generated = {
    select: (pool, query) => {
    return pool.getConnection()
        .then( connection => connection.query(query)
            .then( rows => rows))
    }
}

module.exports = generated;